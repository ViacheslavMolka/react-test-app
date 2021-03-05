import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

export default function HeaderMenu() {
    const { Header } = Layout;
    return(
        <Layout>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1"><Link to='/'>Главная</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/beers/'>Продукты</Link></Menu.Item>
                </Menu>   
            </Header>
        </Layout>
    )
};