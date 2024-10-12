import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { message, Card, Row, Col } from 'antd';
import api from '../../config/axios';
import { Button, notification } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './index.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const processedRef = useRef(false);

  const processPayment = async () => {
    // Nếu đang xử lý, không thực hiện thêm hành động nào
    if (isProcessing) return;
    setIsProcessing(true);

    const queryParams = new URLSearchParams(location.search);
    const vnp_ResponseCode = queryParams.get('vnp_ResponseCode');

    const packageInfo = JSON.parse(localStorage.getItem('pendingAdPackage') || '{}');
    const adData = JSON.parse(localStorage.getItem('adData') || '{}');

    if (vnp_ResponseCode === '00') {
      try {
        const adQueryParams = new URLSearchParams({
          Rank: packageInfo.rank,
          startDate: packageInfo.startDate,
          quantity: packageInfo.quantity,
          total: packageInfo.total
        }).toString();

        const response = await api.post(`Advertisement/CreateAdvertisement?${adQueryParams}`, {
          adId: adData.adId,
          heading: adData.heading,
          image: adData.image,
          link: adData.link,
          userId: adData.userId,
          elementId: adData.elementId
        });
        console.log(response.status);

        notification.success({
          message: 'Thanh toán thành công',
          description: 'Quảng cáo của bạn đã được tạo.',
          duration: 5,
        });

        setPaymentInfo({
          amount: queryParams.get('vnp_Amount'),
          orderInfo: queryParams.get('vnp_OrderInfo'),
          transactionNo: queryParams.get('vnp_TransactionNo'),
          bankCode: queryParams.get('vnp_BankCode'),
          payDate: queryParams.get('vnp_PayDate')
        });
        return;
      } catch (error) {
        console.error('Error creating advertisement:', error);
        message.error('Payment successful but failed to create advertisement');
        navigate('/user-ads');
      }
    } else {
      notification.error({
        message: 'Thanh toán thất bại',
        description: 'Quảng cáo không được tạo.',
        duration: 5,
      });
      navigate('/user-ads');
    }

    localStorage.removeItem('pendingAdPackage');
    localStorage.removeItem('adData');
    setIsProcessing(false);  // Reset trạng thái sau khi xử lý xong
  };

  useEffect(() => {
    if (!processedRef.current) {
      processPayment();
      processedRef.current = true;
    }
  }, []);

  const handleNavigateUserAds = () => {
    navigate('/user-ads');
  };

  if (!paymentInfo) {
    return <div>Đang xử lý thanh toán...</div>;
  }

  return (
    <div className="payment-result-container">
      <Card title="Thông tin thanh toán" className="payment-result-info">
        <div className="payment-details">
          <div className="payment-item">
            <span className="label">Số tiền:    </span>
            <span className="value">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(paymentInfo.amount / 100)}</span>
          </div>
          <div className="payment-item">
            <span className="label">Thông tin đơn hàng:</span>
            <span className="value">{(paymentInfo.orderInfo.split(': ')[1] || paymentInfo.orderInfo)}</span>
          </div>
          <div className="payment-item">
            <span className="label">Mã giao dịch:    </span>
            <span className="value">{paymentInfo.transactionNo}</span>
          </div>
          <div className="payment-item">
            <span className="label">Mã ngân hàng:     </span>
            <span className="value">{paymentInfo.bankCode}</span>
          </div>
          <div className="payment-item">
            <span className="label">Ngày thanh toán:   </span>
            <span className="value">
              {paymentInfo.payDate 
                ? new Date(paymentInfo.payDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6')).toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })
                : 'Không có thông tin'}
            </span>
          </div>
        </div>
        <Button 
          type="primary" 
          icon={<HomeOutlined />} 
          onClick={handleNavigateUserAds}
          className="home-button"
        >
          Về trang quảng cáo
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccess;