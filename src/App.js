import React, { useState } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import { FileExcelFilled, GithubOutlined } from '@ant-design/icons';
import ExcelPage from './components/ExcelPage';
import './App.less';

import {
	Container,
	Logo,
	PageContainer
} from './styles/layout.css';

import {
	InfoCircleOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function App() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const openModal = () => setIsModalVisible(true);
	const closeModal = () => setIsModalVisible(false);

	return (
		<>
			<Container>
				<Header>
					<Logo>
						<FileExcelFilled style={{
							color: '#35c480',
							fontSize: '1.5rem',
							marginRight: '0.5rem',
							transform: 'translateY(0.125rem)'
						}} />
						Excel StripHTML
					</Logo>
					<Menu theme="dark" mode="horizontal">
						<Menu.Item style={{ backgroundColor: '#001529', paddingLeft: 0, paddingRight: 0 }}>
							<Button
								type="text"
								onClick={openModal}
							>
								<InfoCircleOutlined style={{ color: 'rgba(255, 255, 255, 0.65)' }} />
							</Button>
						</Menu.Item>
						<Menu.Item style={{ paddingLeft: '0.5rem', paddingRight: '0' }}>
							<a href="https://github.com/drichar/excel-striphtml">
								<GithubOutlined style={{ fontSize: '24px', transform: 'translateY(0.125rem)' }} />
							</a>
						</Menu.Item>
					</Menu>
				</Header>
				<Content>
					<PageContainer>
						<ExcelPage />
					</PageContainer>
				</Content>
				<Footer>
					<p>&copy; {new Date().getFullYear()} Made with ❤ &nbsp;by Doug Richar</p>
				</Footer>
			</Container>

			<Modal
				title="Expected Format"
				visible={isModalVisible}
				onCancel={closeModal}
				footer={[
					<Button key="submit" type="primary" onClick={closeModal}>
						Close
					</Button>
				]}
			>
				<p>This utility expects:</p>
				<ul>
					<li><strong>Cell A1</strong> to be the title</li>
					<li><strong>Row 1</strong> to be the column names</li>
					<li><strong>Rows 3+</strong> to be the data</li>
				</ul>
			</Modal>
		</>
	);
}

export default App;
