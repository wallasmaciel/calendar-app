import { Component } from "react";
import { NavbarSimple } from "../components/NavbarSimple";
import styled from "styled-components";
import { Calendar } from "../layouts/Calendar";
import { DescriptionSide } from "../layouts/DescriptionSide";
import { Event } from "../utils/ConstCalendar";
import api from "../libs/api";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

type AppState = {
  date?: Date,
  events: any[],
};
export class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      events: [],
    };

    this.handleEvents.bind(this);
    this.handleUpdateListEvents.bind(this);
  }

  handleEvents(date: Date, data: Event[]) {
    this.setState({
      ...this.state, 
      date,
      events: data,
    });
  }

  async handleUpdateListEvents(date: Date) {
    const response = await api.get(`/event/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
      .catch(err => {
        toast.error(`Identified error in request to list events of day. ${String.fromCodePoint(0x1F615)}\n'${err?.response?.data?.message ?? err}'`);
        console.error(err);
      });
    // process finish of refresh, then, loader new events of day
    if (response?.status === 200) {
      this.setState({
        ...this.state, 
        events: response?.data,
      })
    }
  }

  render() {
    return (
      <>
        <header>
          <NavbarSimple />
        </header>
        <main className="d-flex justify-content-center">
          <Container>
            <CalendarArea>
              <Calendar handleEvents={ (date, data: Event[]) => this.handleEvents(date, data) } />
            </CalendarArea>
            <DescriptionArea>
              <DescriptionSide date={ this.state?.date } events={ this.state.events }
                handleUpdateListEvents={ (date) => this.handleUpdateListEvents(date) }/>
            </DescriptionArea>
          </Container>
        </main>
        <ToastContainer />
      </>
    );
  }
}

const Container = styled.div({
  width: '94rem', 
  maxWidth: '100vw',
  maxHeight: '900px',
  backgroundColor: '#FFF',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: '2rem 2rem',
  borderRadius: '.4rem',
});

const CalendarArea = styled.section({
  flex: 1,
  justifyContent: 'center',
  maxWidth: '60rem',
  minWidth: '70%',
});

const DescriptionArea = styled.aside({
  flex: 1, 
  justifyContent: 'center',
  maxWidth: '30%',
  backgroundColor: '#FFF',
});