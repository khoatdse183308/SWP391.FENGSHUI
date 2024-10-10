﻿using FengShuiKoi_BO;
using FengShuiKoi_Services;
using KoiFengShui.BE.Model;
using KoiFengShui.BE.TokenService;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System;
using System.Security.Principal;
using Microsoft.EntityFrameworkCore;

namespace KoiFengShui.BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly IAccountService _accountService;
		private readonly IMemberService _memberService;
		private readonly IToken _tokenService;
		public AccountController(IAccountService accountService, IMemberService memberService, IToken tokenService)
		{
			_memberService = memberService;
			_accountService = accountService;
			_tokenService = tokenService;
		}

		[HttpPost("login")]
		public IActionResult Login(LoginDTO loginAccount)
		{
			var account = _accountService.GetAccountByUserID(loginAccount.UserId);

			if (account == null || account.Password != loginAccount.Password)
			{
				return Unauthorized("Thông tin đăng nhập không hợp lệ");
			}

			if (account.Status != "Active")
			{
				return Unauthorized("Tài khoản không hoạt động");
			}

			var token = _tokenService.CreateToken(account);

			return Ok(new
			{
				Token = token,
				Role = account.Role,
				UserId = account.UserId
			});
		}
        [HttpPut("UpdateAccountUser")]
        public IActionResult UpdateAccountUser(RegisterDTO Account)
        {
            try
            {
                var existingAccount = _accountService.GetAccountByUserID(Account.UserID);
                if (existingAccount == null)
                {
                    return BadRequest("Tài khoản không tồn tại");
                }

                if (string.IsNullOrWhiteSpace(Account.Password))
                {
                    return BadRequest("Mật khẩu không được để trống");
                }
                if (string.IsNullOrWhiteSpace(Account.Email))
                {
                    return BadRequest("Email không được để trống");
                }
                if (string.IsNullOrWhiteSpace(Account.Name))
                {
                    return BadRequest("Tên không được để trống");
                }

                var accountWithSameEmail = _accountService.GetAccountByEmail(Account.Email);
                if (accountWithSameEmail != null && accountWithSameEmail.UserId != Account.UserID)
                {
                    return BadRequest("Email đã tồn tại");
                }
                existingAccount.Password = Account.Password;
                existingAccount.Email = Account.Email;
                var existingMember = _memberService.GetMemberByUserID(Account.UserID);
                if (existingMember != null)
                {
                    existingMember.Name = Account.Name;
                    existingMember.Birthday = Account.Birthday;
                    _memberService.UpdateMember(existingMember);
                }

                bool result = _accountService.UpdateAccountByUser(existingAccount);

                if (result)
                {
                    return Ok("Cập nhật thành công");
                }
                else
                {
                    return BadRequest("Cập nhật thất bại");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi server: {ex.Message}");
            }
        }
        [HttpPut("UpdateAccountAdmin")]
        public IActionResult UpdateAccountAdmin(AccountDTO Account)
        {
            try
            {
                if (_accountService.GetAccountByUserID(Account.UserID) == null)
                {
                    return BadRequest("Tài khoản không tồn tại");
                }

                if (string.IsNullOrWhiteSpace(Account.Password))
                {
                    return BadRequest("Mật khẩu không được để trống");
                }

                if (string.IsNullOrWhiteSpace(Account.status))
                {
                    return BadRequest("Trạng thái không được để trống");
                }

                var acc = new Account
                {
                    UserId = Account.UserID,
                    Password = Account.Password,
                    Status = Account.status
                };

                bool result = _accountService.UpdateAccountByAdmin(acc);

                if (result)
                {
                    return Ok("Cập nhật thành công");
                }
                else
                {
                    return BadRequest("Cập nhật thất bại");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi server: {ex.Message}");
            }
        }


        [HttpGet("GetAllAccountMemberInfo")]
        public IActionResult GetAllAccountMemberInfo()
        {
            var accounts = _accountService.GetAllAccounts();
            var accountInfoList = new List<RegisterDTO>();

            foreach (var account in accounts)
            {
                var member = _memberService.GetMemberByUserID(account.UserId);
				var accountInfo = new RegisterDTO
				{
					UserID = account.UserId,
					Email = account.Email,
					Password = account.Password,
					Role = account.Role,
					status = account.Status,
					Name = member?.Name,
                    Birthday = (DateTime)(member?.Birthday)
                };
                accountInfoList.Add(accountInfo);
            }

            return	Ok( accountInfoList);
        }
        [HttpPost("register")]
		public IActionResult Register(RegisterDTO newAccount)
		{
			if (_accountService.GetAccountByUserID(newAccount.UserID) != null)
			{
				return BadRequest("Tài khoản đã tồn tại");
			}
			if (_accountService.GetAccountByEmail(newAccount.Email) != null)
			{
				return BadRequest("Email đã tồn tại");
			}
			var acc = new Account();
			acc.UserId = newAccount.UserID;
			acc.Password = newAccount.Password;
			acc.Role = newAccount.Role;
			acc.Email = newAccount.Email;
			acc.Status = newAccount.status;
			bool result = _accountService.AddAccount(acc);

			var mem = new Member();
			mem.Name = newAccount.Name;
			mem.Birthday = newAccount.Birthday;
			mem.UserId = newAccount.UserID;
			bool result2 = _memberService.AddMember(mem);

			if (result && result2)
			{
				return Ok("Đăng ký thành công");
			}
			else
			{
				return BadRequest("Đăng ký thất bại");
			}
		}

		[HttpPost("google-login")]
		public IActionResult GoogleLogin([FromBody] GoogleUserDTO googleUser)
		{
			var account = _accountService.GetAccountByEmail(googleUser.Email);

			if (account == null)
			{
				// Tạo tài khoản mới cho người dùng Google
				account = new Account
				{
					UserId = googleUser.GoogleId,
					Email = googleUser.Email,
					Role = "Member",
					Status = "Active",
					Password = Guid.NewGuid().ToString() // Tạo mật khẩu ngẫu nhiên
				};
				_accountService.AddAccount(account);

				// Tạo hồ sơ thành viên mới
				var member = new Member
				{
					UserId = googleUser.GoogleId,
					Name = googleUser.Name,
					Birthday = DateTime.Now // Bạn có thể yêu cầu ngày sinh sau
				};
				_memberService.AddMember(member);
			}

			var token = _tokenService.CreateToken(account);

			return Ok(new
			{
				Token = token,
				Role = account.Role,
				UserId = account.UserId
			});
		}
	}
}