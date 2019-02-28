import styled from 'styled-components';
import { Select, Divider, Icon } from 'antd';

export const StyledSelect = styled(Select)`
  width: ${({ style }) => style && style.width ? style.width : '400px'}
  margin: 10px
`;

export const StyledOption = styled(Select.Option)`

`;

export const BtnContainer = styled.div`
  display: flex
  flex-direction: row
`;

export const SelectBtn = styled.div`
  display: flex
  margin-right: 12px
  align-items: center
  padding: 7px
  cursor: pointer
`;

export const StyledDivider = styled(Divider)`
  margin: 0
`;

export const StyledIcon = styled(Icon)`
  margin-right: 5px
  margin-left: 3px
  color: ${props => props.type === 'plus' ? "green" : "red"}
`;
