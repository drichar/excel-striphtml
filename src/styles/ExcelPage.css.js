import styled from 'styled-components';

export const ActionsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: ${({ isActive }) => isActive ? 'space-between' : 'center'};
	margin-bottom: 2rem;
`;

export const UploadContainer = styled.div`
	margin-right: ${({ isActive }) => isActive ? '2rem' : 0};
	margin-bottom: 2rem;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const SheetTitle = styled.h2`
	margin: 0;
`;
