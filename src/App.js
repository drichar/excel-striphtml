import React from 'react';
import { Layout, Menu } from 'antd';
import { FileExcelFilled, GithubOutlined } from '@ant-design/icons';
import ExcelPage from './components/ExcelPage';
import './App.less';

import {
	Container,
	Logo,
	PageContainer
} from './styles/layout.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
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
					<Menu.Item>
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
  );
}

export default App;
