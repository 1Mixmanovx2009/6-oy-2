import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import '../App.css'; // CSS faylini import qilish

const OrganizationDetail = ({ data, updateOrganization }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [organization, setOrganization] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log(data); // data ni konsolga chiqarish
    const org = data.find(item => item.id === parseInt(id));
    if (org) {
      setOrganization(org);
      form.setFieldsValue(org); // Formni tashkilot ma'lumotlari bilan to'ldirish
    } else {
      message.error('Tashkilot topilmadi'); // Agar tashkilot topilmasa xabar berish
    }
  }, [id, data, form]);

  const handleUpdate = (values) => {
    updateOrganization(id, values); // Yangilangan ma'lumotlarni o'rnatish
    message.success('Tashkilot muvaffaqiyatli yangilandi!');
    setIsModalVisible(false); // Modalni yopish
  };

  const handleEdit = () => {
    setIsModalVisible(true); // Modalni ochish
  };

  if (!organization) return <div className="not-found">Tashkilot topilmadi</div>;

  return (
    <div className="organization-detail">
      <h2 className="title">{organization.name} haqida ma'lumot</h2>
      <div className="info">
        <p><strong>INN:</strong> {organization.inn}</p>
        <p><strong>Manzil:</strong> {organization.address}</p>
      </div>
      <Button type="primary" onClick={handleEdit} className="edit-button">Tahrirlash</Button>

      <Modal
        title="Tashkilotni tahrirlash"
        visible={isModalVisible}
        onOk={() => form.submit()} // Formani yuborish
        onCancel={() => setIsModalVisible(false)} // Modalni yopish
        okText="Yangilash"
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}> {/* Tahrirlash uchun form */}
          <Form.Item
            name="name"
            label="Tashkilot nomi"
            rules={[{ required: true, message: 'Tashkilot nomi kiriting!' }]} // Validatsiya
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inn"
            label="INN"
            rules={[{ required: true, message: 'INN kiriting!' }]} // Validatsiya
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Manzil"
            rules={[{ required: true, message: 'Manzil kiriting!' }]} // Validatsiya
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrganizationDetail;
