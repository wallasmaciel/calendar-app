import { Component, ReactNode } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { CardDay } from '../../components/CardDay';
import { toast } from 'react-toastify';
import api from '../../libs/api';

import ConstCalendar, { Event } from '../../utils/ConstCalendar';

type CalendarProps = {
  handleEvents: (date: Date, data: Event[]) => void,
};
type CalendarState = {
  date: Date,
  events: Event[],
  checkedDate?: Date,
};
export class Calendar extends Component<CalendarProps, CalendarState> {
  private readonly countWeeksOfMonth: number = 5;

  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      date: new Date(),
      events: [],
    }; 

    this.drawCalendarMonth.bind(this);
    this.drawCalendarDays.bind(this);
    this.handleMonthNow.bind(this);
    this.handleIncMonth.bind(this);
    this.handleDecMonth.bind(this);
    this.handleDayClick.bind(this);
  }

  componentDidMount() {
    const now = new Date();
    this.handleDayClick(now.getMonth(), now.getDate());
  }

  private drawCalendarMonth(): ReactNode {
    return (
      <>
        <thead>
          <tr>
            { ConstCalendar.days.map((value, index) => (
              <td key={ index } className='text-center'>
                <span>{ value }</span>
              </td>
            )) }
          </tr>
        </thead>
        { this.drawCalendarDays(this.state.date.getFullYear(), this.state.date.getMonth()) }
      </>
    );
  }

  private handleDayClick(month: number, day: number): void {
    if (this.state.checkedDate?.getMonth() === month && this.state.checkedDate?.getDate() === day) return;
    this.setState({
      ...this.state,
      checkedDate: new Date(this.state.date.getFullYear(), month, day),
    });
    // Increment the month to compatibility of reading in request
    api.get(`/event/${this.state.date.getFullYear()}/${month + 1}/${day}`)
      .then(response => {
        this.props.handleEvents(new Date(this.state.date.getFullYear(), month, day), response.data);
      })
      .catch(err => {
        toast.error(`Identified error in request events day. ${String.fromCodePoint(0x1F615)}\n'${err?.response?.data?.message ?? err}'`);
        console.error(err);
      });
  }

  private drawCalendarDays(year: number, month: number): ReactNode {
    const now: Date = new Date();
    const firstDayOfMonth: Date = new Date(year, month, 1);
    const lastDayOfMonth: Date = new Date(year, month + 1, 0);

    let daysWeek: ReactNode[][] = [];
    let tempWeek: number = 0;
    // Prencher primeira coluna com os dias faltantes a esquerda para completar o calendario 
    daysWeek[tempWeek] = [];
    for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
      // Identificar os ultimos dias do mes anterior 
      const daysOfPreviousMonth: number = new Date(year, 
        month, (-1 * (i - 1))).getDate();
      daysWeek[tempWeek].push(
        <CardDay day={ daysOfPreviousMonth } month={ month - 1 } onHandleClick={ this.handleDayClick.bind(this) }
          dateChecked={ this.state.checkedDate?.getMonth() === month - 1 && this.state.checkedDate?.getDate() === daysOfPreviousMonth }
          disabled />
      );
    }
    // Preencher o calendario com os dias do mês
    for (let i = 0; i < lastDayOfMonth.getDate(); i++) { 
      if (daysWeek[tempWeek].length % ConstCalendar.days.length === 0) daysWeek[++tempWeek] = [];
        daysWeek[tempWeek].push(<CardDay day={ i + 1 } month={ month } onHandleClick={ this.handleDayClick.bind(this) }
          dateChecked={ this.state.checkedDate?.getMonth() === month && this.state.checkedDate?.getDate() === i + 1 }
          dateNow={ now.getMonth() === month && now.getDate() === i + 1 } />);
    }

    // Verificar se nem todas as semanas do mês foram definidas 
    if (this.countWeeksOfMonth - daysWeek.length > 0) {
      for (let i = daysWeek.length; i < this.countWeeksOfMonth; i++)
        daysWeek[++tempWeek] = [];
    }

    // Preencher o calendario com os dias faltantes a direita para complentar o calendario 
    for (let i = 1; i < daysWeek.length; i++) {
      if (daysWeek[i].length < ConstCalendar.days.length) {
        // Dias que faltam para completar o calendario 
        const temp = (ConstCalendar.days.length - daysWeek[i].length);
        for (let j = 1; j <= temp; j++) 
          daysWeek[i].push(<CardDay day={ j } month={ month + 1 } onHandleClick={ this.handleDayClick.bind(this) }
            dateChecked={ this.state.checkedDate?.getMonth() === month + 1 && this.state.checkedDate?.getDate() === j }
            disabled />);
      }
    }

    return (
      <tbody>
        {daysWeek.map((_, indexWeek) => (
          <tr key={ indexWeek }>
            { daysWeek[indexWeek].map((element, indexDay) => (
              <td key={ indexDay }>
                { element }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  private handleMonthNow() {
    this.setState({
      ...this.state,
      date: new Date(),
    });
    this.handleDayClick(this.state.date.getMonth(), this.state.date.getDate())
  }

  private handleIncMonth() {
    this.setState({
      ...this.state,
      date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1),
    })
  }

  private handleDecMonth() {
    this.setState({
      ...this.state,
      date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() - 1),
    });
  }

  render() {
    const descriptionMonth: string = ConstCalendar.months[this.state.date.getMonth()]
    const year: number = this.state.date.getFullYear();
    return (
      <Container>
        { /* Divisoria superior */ }
        <div className="m-2 border-bottom border-4 border-warning"></div>

        <CalendarHeader>
          <Button variant="dark"
            onClick={ () => this.handleDecMonth() }>
            <CaretLeft size={ 24 } color="#f3ecec" weight="fill" />
          </Button>
          <span>{ `${descriptionMonth} ${year}`  }</span>
          <span>
            <Button variant="secondary" className='me-1'
              onClick={ () => this.handleMonthNow() }>
              Today
            </Button>
            <Button variant="dark"
              onClick={ () => this.handleIncMonth() }>
              <CaretRight size={ 24 } color="#f3ecec" weight="fill" />
            </Button>
          </span>
        </CalendarHeader>
        <CalendarBody data-bs-spy="scroll">
          <Table responsive bordered size='sm'>
            { this.drawCalendarMonth() }
          </Table>
        </CalendarBody>
      </Container>
    )
  }
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column', 
  width: '100%',
  height: '100%',
});

const CalendarHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.4rem',
}); 

const CalendarBody = styled.div({
  height: '100%',
  padding: '0 .4rem',
  overflowY:'auto',
  overflowX: 'auto',
});