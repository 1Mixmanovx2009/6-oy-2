import React, { useState } from 'react';
import { Layout, Menu, Button, Table, Input, Space, Dropdown, Modal, Form, Input as AntInput, message } from 'antd';
import { HomeOutlined, UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined, GithubOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // useNavigate import qilingan
import '../App.css';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const AdminPanel = ({ data, setData }) => {
  const navigate = useNavigate(); // useNavigate ni ishlatamiz
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        const newData = {
          key: data.length + 1,
          id: data.length + 1,
          ...values,
          status: 'Faol',
          createdAt: new Date().toLocaleDateString(),
        };
        setData([...data, newData]);
        message.success('Tashkilot muvaffaqiyatli qo‘shildi!');
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        message.error('Maʼlumotlarni to‘ldiring!');
      });
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    message.success('Tashkilot muvaffaqiyatli o‘chirildi!');
  };

  const handleSearch = (value) => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.inn.includes(value) ||
      item.address.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const handleMore = (record) => {
    navigate(`/organization/${record.id}`); // history.push o'rniga navigate
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
    },
    {
      title: 'Tashkilot nomi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'INN',
      dataIndex: 'inn',
      key: 'inn',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Yaratilgan vaqt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Batafsil',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => handleDelete(record.id)}>O'chirish</Menu.Item>
                <Menu.Item key="2" onClick={() => handleMore(record)}>Batafsil</Menu.Item>
              </Menu>
            }
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <Layout className="admin-layout">
      <Sider className="sidebar" width={200}>
        <div className="logo">
          <GithubOutlined style={{ fontSize: '40px', color: 'white' }} />
        </div>
        <div className="line"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Foydalanuvchilar
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          <span className="title">Tashkilotlar</span>
          <Search className="search" placeholder="Qidirish..." style={{ width: 200 }} onSearch={handleSearch} />
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={showModal}>
            Qo'shish
          </Button>
        </Header>
        <Content className="content">
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={{ pageSize: 2 }} />
        </Content>
      </Layout>

      <Modal
        title="Yangi tashkilot qo'shish"
        visible={isModalVisible}
        onOk={handleAdd}
        onCancel={handleCancel}
        okText="Qo'shish"
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tashkilot nomi" rules={[{ required: true, message: 'Tashkilot nomi kiriting!' }]}>
            <AntInput />
          </Form.Item>
          <Form.Item name="inn" label="INN" rules={[{ required: true, message: 'INN kiriting!' }]}>
            <AntInput />
          </Form.Item>
          <Form.Item name="address" label="Manzil" rules={[{ required: true, message: 'Manzil kiriting!' }]}>
            <AntInput />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminPanel;
