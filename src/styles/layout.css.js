import styled from 'styled-components';
import { Layout } from 'antd';

export const Container = styled(Layout)`
	min-height: 100vh;

	.ant-layout-header {
		display: flex;
		justify-content: space-between;
		height: 4rem;
		padding: 0 1.5rem;
		line-height: 4rem;

		.ant-menu-item {
			.anticon {
				font-size: 24px;
				margin: 0;
				transform: translateY(0.125rem);
			}
		}
	}

	.ant-layout-content {
		padding: 0;
	}

	.ant-layout-footer {
		display: flex;
		align-items: center;
		justify-content: center;

		p {
			margin-right: 1rem;
			margin-bottom: 0;
		}

		img {
			width: 8rem;
		}
	}

	@media screen and (min-width: 40em) {
		.ant-layout-header {
			padding: 0 3rem;
		}

		.ant-layout-content {
			padding: 0 3rem;
		}
	}
`;

export const Logo = styled.span`
	color: #fff;
	font-size: 1rem;
	font-weight: 700;
	margin-right: 1.5rem;
`;

export const PageContainer = styled.div`
	background: #fff;
	padding: 1.5rem;
	min-height: 20rem;
`;
