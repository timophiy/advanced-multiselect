import React, { Component, ReactNode } from 'react';
import { equals, isEmpty } from 'ramda';
import 'antd/dist/antd.css';
import {
  StyledSelect,
  StyledOption,
  StyledDivider,
  StyledIcon,
  SelectBtn,
  BtnContainer
} from './styles';

export interface IOption {
  value: string,
  label: string
}

export interface IState {
  selected: string[]
}

export interface IProps {
  options: IOption[],
  mode: string,
  maxTagCount?: number,
  placeholder?: string,
  style?: object
}

class AdvancedSelect extends Component<IProps, IState> {
  state = {
    selected: []
  };

  extractValues = (array: IOption[]) => array.map(o => o.value);

  OPTIONS = this.extractValues(this.props.options);

  handleChange = (value: any, option: any) => {
    console.log(option);

    this.setState({
      selected: value
    });
  };

  handleGroupSelect = (type: string) => {
    if (type === 'select') {
      this.setState({
        selected: this.OPTIONS
      });
    } else if (type === 'deselect') {
      this.setState({
        selected: []
      });
    }
  };

  dropdownRender = (menu?: ReactNode) => (
    <div>
      {menu}
      <StyledDivider />
      {
        isEmpty(this.state.selected)
          ? (
            <SelectBtn
              onClick={() => this.handleGroupSelect('select')}>
              <StyledIcon type="plus" />
              Select All
            </SelectBtn>
          ) : equals(this.OPTIONS, this.state.selected)
            ? (
              <SelectBtn
                onClick={() => this.handleGroupSelect('deselect')}>
                <StyledIcon type="cross" />
                Deselect All
              </SelectBtn>
            ) : (
              <BtnContainer>
                <SelectBtn
                  onClick={() => this.handleGroupSelect('select')}>
                  <StyledIcon type="plus" />
                  Select All
                </SelectBtn>
                <SelectBtn
                  onClick={() => this.handleGroupSelect('deselect')}>
                  <StyledIcon type="cross" />
                  Deselect All
                </SelectBtn>
              </BtnContainer>
            )
      }
    </div>
  );

  render() {
    const { options } = this.props;
    const { selected } = this.state;

    return (
      <div onMouseDown={(e) => { e.preventDefault(); return false; }} >
        <StyledSelect
          {...this.props}
          value={selected}
          onChange={this.handleChange}
          dropdownRender={this.dropdownRender}>
            {options.map(({ value, label }: IOption) =>
              <StyledOption key={value} value={value}>{label}</StyledOption>
            )}
        </StyledSelect>
      </div>
    );
  }
}

export default AdvancedSelect;
