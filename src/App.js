import React from 'react';
import { Layout } from 'antd';
import { FileExcelFilled } from '@ant-design/icons';
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
