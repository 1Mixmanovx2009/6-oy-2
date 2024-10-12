import React, { useState } from 'react'; // useState import qiling
import './App.css';
import { Layout, Menu, Button, Table, Input, Space, Dropdown, Tree } from 'antd';
import { HomeOutlined, UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined, GithubOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const x = 3;
const y = 2;
const z = 1;
const defaultData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: key,
      key,
    });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const AdminPanel = () => {
  const [gData, setGData] = useState(defaultData); // useState bilan gData holatini yaratish
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

  const onDragEnter = (info) => {
    console.log(info);
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i, 0, dragObj);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
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
      render: () => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
          <Dropdown overlay={<Menu><Menu.Item>Edit</Menu.Item><Menu.Item>Delete</Menu.Item></Menu>}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      id: 1,
      name: '—',
      inn: '223344556',
      status: 'Faol',
      address: 'Toshkent, Chilonzor 9kv',
      createdAt: '05.11.2018',
    },
    {
      key: 2,
      id: 2,
      name: 'Cambridge academy',
      inn: '—',
      status: 'Faol',
      address: 'Toshkent, Chilonzor 10kv',
      createdAt: '05.11.2005',
    },
  ];

  return (
    <Layout className="admin-layout">
      <Sider className="sidebar" width={200}>
        <div className="logo">
          <GithubOutlined style={{ fontSize: '40px', color: 'white', }} />
        </div>
        <div className="line"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Tree
              className="draggable-tree"
              defaultExpandedKeys={expandedKeys}
              draggable
              blockNode
              onDragEnter={onDragEnter}
              onDrop={onDrop}
              treeData={gData}
            />
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Foydalanuvchilar
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          <span className="title">Tashkilotlar</span>
          <Search className="search" placeholder="Qidirish..." style={{ width: 200 }} />
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Qo'shish
          </Button>
        </Header>
        <Content className="content">
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 2 }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
