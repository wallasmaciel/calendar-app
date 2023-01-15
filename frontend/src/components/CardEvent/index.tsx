import { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { X } from 'phosphor-react';
import { Event } from '../../utils/ConstCalendar';
import api from '../../libs/api';
import { toast } from 'react-toastify';

type CardEventProps = {
  event: Event,
  handleUpdateListEvents: (date: Date) => void,
}
export class CardEvent extends Component<CardEventProps> {
  constructor(props: CardEventProps) {
    super(props);
    this.handleRemoveEvent.bind(this);
  }

  async handleRemoveEvent() {
    if (!this.props?.event?.id) {
      toast.info(`Event 'id' not found. ${String.fromCodePoint(0x1F633)}`);
      return;
    }
    const response = await api.delete(`/event/${this.props.event.id}`)
      .catch(err => {
        toast.error(`Identified error in request to remove event. ${String.fromCodePoint(0x1F615)}\n'${err?.response?.data?.message ?? err}'`);
        console.error(err);
      });
    // verify the event was be removed
    if (response?.status === 200) toast.success(`Remove event was successful! ${String.fromCodePoint(0x1F609)}`);
    // refresh event list of day
    this.props.handleUpdateListEvents(this.props.event.date);
  }

  render() {
    return (
      <div className="container d-flex align-items-stretch p-2 border rounded" role="alert">
        <div className='p-2 flex-fill d-flex flex-column'>
          <h1>{ this.props.event?.title ?? '(Title was not provided)' }</h1>
          <label>{ this.props.event?.description ?? '(Description was not provided)' }</label>
        </div>
        <div className='mt-2'>
          <OverlayTrigger 
              placement="left"
              overlay={<Tooltip id="button-tooltip-1">Remover evento</Tooltip>}
            >
            <Button variant='light' onClick={ () => this.handleRemoveEvent() }>
              <X size={ 24 } color='#000' />
            </Button>
          </OverlayTrigger>
        </div>
      </div>
    );
  }
}