import React, { useEffect } from 'react';
import { Button, DatePicker, Drawer, Form, Input, InputNumber, Radio } from 'antd';
import { drawerStateSelector } from './state/meetingSelector';
import { connect } from 'react-redux';
import { createNewMeetingAction, onDrawerCloseAction, updateMeetingAction } from './state/meetingActions';
import moment from 'moment';
import dateUtil from '../../utils/dateUtil';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const MeetingDrawer = ({ drawer, onDrawerClose, createNewMeeting, updateMeeting }) => {
  const [form] = Form.useForm();
  const isNewMeeting = Object.keys(drawer.data).length === 0;

  const onFinish = (values) => {
    if (isNewMeeting) {
      createNewMeeting({
        ...values,
        date: dateUtil.format(values.date)
      });
    } else {
      updateMeeting({ ...drawer.data, ...values });
    }
  };

  useEffect(() => {
    if (isNewMeeting) {
      form.resetFields();
    } else {
      const date = moment(dateUtil.format(drawer.data.date));
      form.setFieldsValue({ ...drawer.data, date });
    }
  }, [drawer.visible]);

  return (
    <Drawer
      title={drawer.data.label || 'Create New Meeting'}
      placement="right"
      visible={drawer.visible}
      onClose={onDrawerClose}
      width={500}
      footer={
        <div style={{ display: 'flex' }}>
          <Button type="primary" onClick={form.submit} style={{ margin: 'auto', width: '100%', height: 80 }}>
            {isNewMeeting ? 'Create' : 'Edit'}
          </Button>
          <Button type="secondary" onClick={onDrawerClose} style={{ margin: 'auto', width: '100%', height: 80 }}>
            Cancel
          </Button>
        </div>
      }
      footerStyle={{ padding: 0, height: 81 }}
    >
      <Form {...layout} name="meeting-form" form={form} onFinish={onFinish}>
        <Form.Item name={'label'} label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'date'} label="Date" rules={[{ required: true }]}>
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            disabledDate={(current) => {
              return current && current < moment().startOf('day');
            }}
          />
        </Form.Item>
        <Form.Item name={'duration'} label="Duration" rules={[{ required: true }, { type: 'number', min: 0, max: 999 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={'link'} label="Link" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Priority" name="priority" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="Low">Low</Radio.Button>
            <Radio.Button value="Medium">Medium</Radio.Button>
            <Radio.Button value="High">High</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={'description'} label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const mapDispatchToProps = {
  createNewMeeting: createNewMeetingAction,
  updateMeeting: updateMeetingAction,
  onDrawerClose: onDrawerCloseAction
};

const mapStateToProps = (state) => {
  return {
    drawer: drawerStateSelector(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDrawer);
