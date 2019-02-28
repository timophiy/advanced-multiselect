import React, { Component, ReactNode } from 'react';
import { isEmpty, pluck, sort, map, T, dissoc, curry } from 'ramda';
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
  selected: {
    [key: string]: boolean,
  };
  isOpen: boolean,
  searched: string
}

export interface IProps {
  options: IOption[],
  mode: string,
  maxTagCount?: number,
  placeholder?: string,
  style?: object
}

const toKeysMap =
  (list, value = false) =>
    list.reduce((acc, key) => {
      acc[key] = value;

      return acc;
    }, {});

const dissocAll = curry(
  (keys: any, obj) =>
    Object.entries(obj)
      .reduce((acc, [key, value]) => {
        if (!keys.includes(key)) {
          acc[key] = value;
        }

        return acc;
      }, {})
);

class AdvancedSelect extends Component<IProps, IState> {
  state = {
    selected: {},
    searched: '',
    isOpen: false
  };

  SORTED = [];

  handleSelect = key => {
    this.setState(({ selected }) => ({
      selected: {
        ...selected,
        [key]: false
      }
    }));
  };

  handleDeselect = key => {
    this.setState(({ selected }) => ({
      selected: dissoc(key, selected)
    }));
  };

  handleGroupSelect = (type: string) => {
    this.setState(prevState => ({
      selected:
        type === 'select'
          ? {
            ...prevState.selected,
            ...toKeysMap(pluck('value', this.SORTED))
          }
          : !prevState.searched
            ? {}
            : dissocAll(
              Object.keys(toKeysMap(pluck('value', this.SORTED))),
              prevState.selected
            ),
      searched: ''
    }));
  };

  onSelectBlur = () => {
    this.setState(prevState => ({
      isOpen: false,
      selected: map(T, prevState.selected)
    }));
  };

  dropdownRender = (menu: ReactNode) => (
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
          ) : Object.keys(this.state.selected).length === this.props.options.length
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
    const { selected, isOpen } = this.state;

    this.SORTED =
      sort(({ value }) =>
          !this.state.selected[value] ? -1 : 0,
        !this.state.searched ? this.props.options :
          this.props.options.filter(({ value }) =>
            value.toLowerCase()
              .includes(this.state.searched)
          )
      );

    return (
      <div onMouseDown={e => e.preventDefault()}>
        <StyledSelect
          {...this.props}
          open={isOpen}
          onFocus={() => this.setState({ isOpen: true })}
          onChange={console.log}
          onSearch={val => this.setState({ searched: val })}
          onBlur={this.onSelectBlur}
          onSelect={this.handleSelect}
          onDeselect={this.handleDeselect}
          value={Object.keys(selected)}
          dropdownRender={this.dropdownRender}>
            {this.SORTED.map(({ value, label }: IOption) =>
              <StyledOption key={value} value={value}>{label}</StyledOption>
            )}
        </StyledSelect>
      </div>
    );
  }
}

export default AdvancedSelect;
