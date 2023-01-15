import { Component } from "react";
import styled from "styled-components";

type CardDayProps = {
  day: number,
  month: number,
  dateChecked: boolean,
  onHandleClick: (month: number, day: number) => void, 
  dateNow?: boolean,
  disabled?: any,
};
export class CardDay extends Component<CardDayProps> {
  render() {
    return (
      <CardContent className={ `${this.props.dateChecked? 'border border-3': ''} rounded` } data-now={ this.props.dateNow }
        data-disabled={ this.props.disabled? true : false } onClick={ () => this.props.onHandleClick(this.props.month, this.props.day) }>
        <LabelDay>{ this.props.day }</LabelDay>
      </CardContent>
    );
  }
};

const CardContent = styled.div({
  width: "8rem",
  height: "8rem",
  marginLeft: '.4rem',
  padding: ".4rem",
  cursor: 'pointer',
  "&[data-now=true]": {
    backgroundColor: "#f5f5f5",
  },
  "&[data-disabled=true]": {
    opacity: '.2'
  }
});

const LabelDay = styled.label({
  width: "100%",
  textAlign: 'right',
});