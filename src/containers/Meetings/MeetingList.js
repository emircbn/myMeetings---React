import React from 'react';
import { Button, Layout, Menu, Popconfirm, Table, Tooltip, Dropdown, Input } from 'antd';
import { meetingListSelector } from './state/meetingSelector';
import { connect } from 'react-redux';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { deleteMeetingAction, onDrawerOpenAction, onSearchAction } from './state/meetingActions';
import { withRouter } from 'react-router';
import { logoutAction } from '../app/appActions';
import { debounce } from '../../utils/debounce';
import dateUtil from '../../utils/dateUtil';

const { Content } = Layout;

const MeetingList = ({ onDrawerOpen, history, meetings, logout, deleteMeeting, onSearch }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'label',
      key: 'meeting-list-title'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      responsive: ['lg'],
      key: 'meeting-list-description'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'meeting-list-description',
      render: (date) => {
        return dateUtil.format(date, 'tableday');
      }
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'meeting-list-duration',
      responsive: ['md'],
      render: (duration) => {
        return `${duration} min`;
      }
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      responsive: ['lg'],
      key: 'meeting-list-priority'
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'meeting-list-link',
      render: (link) => {
        return <Button type="link">{link}</Button>;
      }
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'meeting-list-edit',
      width: 50,
      render: (id, record) => {
        return (
          <div
            className="action-button"
            style={{ fontSize: 15, cursor: 'pointer' }}
            onClick={() => {
              onDrawerOpen(id, record);
            }}
          >
            <Tooltip placement="left" title="Edit">
              <EditOutlined />
            </Tooltip>
          </div>
        );
      }
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'meeting-list-delete',
      width: 50,
      render: (id) => {
        return (
          <div className="action-button" style={{ fontSize: 15, cursor: 'pointer' }}>
            <Tooltip placement="bottom" title="Delete">
              <Popconfirm
                placement="right"
                okText={'Ok'}
                cancelText={'Cancel'}
                title={'Are you sure you want to delete it?'}
                onConfirm={() => {
                  deleteMeeting(id);
                }}
              >
                <DeleteOutlined />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      }
    }
  ];

  return (
    <Layout className="dashboard-layout">
      <Layout.Header>
        <div style={{ display: 'flex' }}>
          <div
            style={{ marginLeft: 'auto', marginRight: 10 }}
            onClick={() => {
              onDrawerOpen();
            }}
          >
            <Button>Create New Meeting</Button>
          </div>
          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu
                onClick={() => {
                  logout();
                  history.push('/auth');
                }}
              >
                <Menu.Item>Logout</Menu.Item>
              </Menu>
            }
          >
            <Button style={{ margin: 'auto', marginLeft: 10, marginRight: 10 }}>
              <UnorderedListOutlined />
            </Button>
          </Dropdown>
        </div>
      </Layout.Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ display: 'flex', padding: '10px 16px' }}>
          <Input.Search
            style={{ maxWidth: 300 }}
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onChange={debounce((e) => {
              onSearch(e.target.value.length === 0 ? null : e.target.value);
            })}
          />
        </div>
        <Table
          columns={columns}
          dataSource={meetings}
          scroll={{ y: 'calc(100vh - 280px)' }}
          rowKey={(record) => {
            return record?.id;
          }}
          pagination={{
            pageSizeOptions: [20, 50, 100],
            total: meetings.length
          }}
        />
      </Content>
    </Layout>
  );
};

const mapDispatchToProps = {
  logout: logoutAction,
  onSearch: onSearchAction,
  onDrawerOpen: onDrawerOpenAction,
  deleteMeeting: deleteMeetingAction
};

const mapStateToProps = (state) => {
  return {
    meetings: meetingListSelector(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MeetingList));
