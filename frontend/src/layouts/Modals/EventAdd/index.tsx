import React, { Component, FormEvent } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import api from '../../../libs/api';
import { toast } from 'react-toastify';

type ModalEventAddProps = {
  date?: Date,
  show: boolean,
  handleClose: () => void,
  refreshListEvents: () => void,
};
type ModalEventAddState = {
  title: string, 
  description: string,
};
export class ModalEventAdd extends Component<ModalEventAddProps, ModalEventAddState> {
  constructor(props: ModalEventAddProps) {
    super(props);
    this.state = {
      title: '', 
      description: '', 
    };
    this.handleChangeInput.bind(this);
    this.resetForm.bind(this);
    this.handleAddEvent.bind(this);
    this.handleCancelEvent.bind(this);
  }

  handleChangeInput(e: any) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  resetForm() {
    this.setState({
      title: '', 
      description: '',
    })
  }

  handleAddEvent(e: FormEvent) {
    e.preventDefault();
    if (!this.props.date) {
      toast.info(`Inform a valid date. ${String.fromCodePoint(0x1F633)}\ninvalid: '${this.props.date}'`);
      return;
    }

    api.post('/event', {
      date: this.props.date.getFullYear() + '-' + (this.props.date.getMonth() + 1) + '-' + this.props.date.getDate(),
      title: this.state.title,
      description: this.state.description,
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        toast.success(`Event created successfully. ${String.fromCodePoint(0x1F609)}`);
        this.props.refreshListEvents();
        this.props.handleClose();
        this.resetForm();
      } else {
        toast.error(`Oooh, something wen wrong ${String.fromCodePoint(0x1F615)}. check the console`);
      }
    }).catch(err => {
      toast.error(`Identified error in request to create event. ${String.fromCodePoint(0x1F615)}\n'${err?.response?.data?.message ?? err}'`);
      console.error(err);
    })
  }

  handleCancelEvent() {
    this.props.handleClose();
    this.resetForm();
  }

  render() {
    return (
      <Modal show={ this.props.show } onHide={ () => this.handleCancelEvent() }>
        <Form onSubmit={ (e) => this.handleAddEvent(e) }>
          <Modal.Header closeButton>
            <Modal.Title>Adding new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formControlTitle">
              <Form.Label>Title event</Form.Label>
              <Form.Control type="text" placeholder="Enter title" name="title" required={ true }
                value={ this.state.title } onChange={ (e) => this.handleChangeInput(e) }/>
              <Form.Text className="text-muted">
                Enter the title of your event
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formControlDescription">
              <Form.Label>Description event</Form.Label>
              <Form.Control type="text" placeholder="Enter description" name="description" required={ true }
                value={ this.state.description } onChange={ (e) => this.handleChangeInput(e) }/>
              <Form.Text className="text-muted">
                Enter the description of your event
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formControlDescription">
              <Form.Label>Date of the event</Form.Label>
              <Form.Control type="text" disabled value={ `${this.props.date?.getDate()}/${(this.props.date?.getMonth() ?? -1) + 1}/${this.props.date?.getFullYear()}` }/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ () => this.handleCancelEvent() }>
              Cancel
            </Button>
            <Button variant="primary" type='submit'>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}