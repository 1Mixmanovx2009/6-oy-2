import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useParams } from 'react-router-dom';

const OrganizationDetail = ({ data, updateOrganization }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const org = data.find(item => item.id === parseInt(id)); 
    if (org) {
      setOrganization(org);
      form.setFieldsValue(org);
    }
  }, [id, data, form]);

  const handleUpdate = (values) => {
    updateOrganization(id, values); 
    message.success('Tashkilot muvaffaqiyatli yangilandi!');
  };

  if (!organization) return <div>Tashkilot topilmadi</div>;

  return (
    <div>
      <h2>{organization.name} haqida ma'lumot</h2>
      
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="name" label="Tashkilot nomi" rules={[{ required: true, message: 'Tashkilot nomi kiriting!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="inn" label="INN" rules={[{ required: true, message: 'INN kiriting!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Manzil" rules={[{ required: true, message: 'Manzil kiriting!' }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">Yangilash</Button>
      </Form>
    </div>
  );
};

export default OrganizationDetail;
