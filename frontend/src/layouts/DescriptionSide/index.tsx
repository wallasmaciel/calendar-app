import { Component } from 'react';
import styled from 'styled-components';
import { CardEvent } from '../../components/CardEvent';
import { Button } from 'react-bootstrap';
import ConstCalendar, { Event } from '../../utils/ConstCalendar';
import { ModalEventAdd } from '../Modals/EventAdd';
import { toast } from 'react-toastify';

type DescriptionSideProps = {
  date?: Date,
  events: Event[],
  handleUpdateListEvents: (date: Date) => void,
};
type DescriptionSideState = {
  events: Event[],
  showModalEventAdd: boolean,
};
export class DescriptionSide extends Component<DescriptionSideProps, DescriptionSideState> {  
  constructor(props: DescriptionSideProps)  {
    super(props);
    this.state = {
      events: this.props.events,
      showModalEventAdd: false,
    };
    this.handleModalEventAddOpen.bind(this);
    this.handleModalEventAddClose.bind(this);
    this.refreshListEvents.bind(this);
  }

  getNameFullDay(): string {
    if (!this.props?.date) return '';
    return ConstCalendar.daysFull[this.props?.date?.getDay()];
  }

  getNameMonth(): string {
    if (!this.props?.date) return '';
    return ConstCalendar.months[this.props?.date?.getMonth()];
  }

  handleModalEventAddOpen() {
    if (!this.props.date) {
      toast.warn(`Valid date is required. ${String.fromCodePoint(0x1F633)}\n'${this.props.date}'`);
      return;
    }
    this.setState({
      ...this.state,
      showModalEventAdd: true,
    });
  }

  handleModalEventAddClose() {
    this.setState({
      ...this.state,
      showModalEventAdd: false,
    });
  }

  refreshListEvents() {
    if (!this.props?.date) return;
    this.props.handleUpdateListEvents(this.props.date);
  }

  render() {
    return (
      <DescriptionSideContent className='d-flex'>
        { /* Divisoria lateral esquerda */ }
        <div className="my-3 border-start border-4 border-warning"></div>

        <div className='p-4 flex-fill'>
          <h1>{ this.getNameFullDay() }</h1>
          <h2>{ `${ this.getNameMonth() } ${this.props?.date?.getDate() ?? ''}`.trim() }</h2>

          <ListEvents className='d-flex flex-column mt-4 gap-3'>
            { this.props?.date && (
              <>
                { this.props?.events?.map((event, index) => <CardEvent key={ index } event={ event } 
                  handleUpdateListEvents={ (date) => this.props.handleUpdateListEvents(new Date(date)) } />) }
              </>
            )}
          </ListEvents>

          <div className='d-grid'>
            <Button variant='primary' type='button' onClick={ () => this.handleModalEventAddOpen() }>
              Add event
            </Button>
          </div>
        </div>

        <ModalEventAdd date={ this.props.date } show={ this.state.showModalEventAdd } handleClose={ () => this.handleModalEventAddClose() } 
          refreshListEvents={ () => this.refreshListEvents() }/>
      </DescriptionSideContent>
    )
  }
};

const DescriptionSideContent = styled.div({
  width: '100%',
  height: '100%',
});

const ListEvents = styled.div({
  height: '100%',
  maxHeight: '80%',
  width: '100%',
  overflowX: 'auto',
  overflowY: 'auto',
});