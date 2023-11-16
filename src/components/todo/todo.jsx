import React, { useState, useEffect } from 'react';
import Dashboard from '../dashboard/dashboard';
import { Button, Col, Card, Space, Table, Input, Checkbox } from 'antd';
import { PlusOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { addTodo, deleteTodo, updateTodoStatus } from '../../services/todoService';
import { getDatabase, ref, onValue, child } from 'firebase/database';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Row = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            },
        ),
        transition,
        cursor: 'move',
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

function Todo() {
    const columns = [
        {
            title: <div className='text-center'>Title</div>,
            dataIndex: 'title',
            key: 'title',
            align: 'left',
            render: (text, todo) => (
                <div>
                    <Checkbox onChange={(e) => onChange(e, todo)} checked={todo.status === 'Completed'} className='float-left'></Checkbox>

                    {todo.status !== 'Completed' && (
                        <a>
                            <LoadingOutlined className='float-left ml-2 text-orange-400 text-xl' />
                        </a>
                    )}

                    <div className='ml-20'>
                        {todo.status === 'Completed' ? (
                            <del className='bg-slate-200' >{todo.title}</del>
                        ) : (
                            <span>{todo.title}</span>
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text, todo) => (
                <div style={{ color: todo.status === 'In Progress' ? 'orange' : todo.status === 'Completed' ? 'green' : '' }}>
                    {todo.status}
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (task) => (
                <Space size="middle">
                    <a key={task.key} onClick={() => handleDeleteTask(task)}><CloseOutlined className='text-red-500' /></a>
                </Space>
            ),
        },
    ];

    const [dataSource, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const todoRootRef = ref(db, 'Todo');
        const todoRef = child(todoRootRef, 'todos');

        onValue(todoRef, (snapshot) => {
            const data = snapshot.val();
            setTodoList(data ? Object.values(data).reverse() : []);
        });
    }, []);

    const handleAddTask = async () => {
        addTodo(newTask);
        setNewTask('');
    };

    const handleDeleteTask = async (task) => {
        await deleteTodo(task);
    };

    const onChange = (e, todo) => {
        const newStatus = e.target.checked ? 'Completed' : 'In Progress';
        todo.status = newStatus;
        updateTodoStatus(todo);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
    );
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setTodoList((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    return (
        <div>
            <Dashboard />
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 22, offset: 1 }} lg={{ span: 12, offset: 6 }} xl={{ span: 12, offset: 6 }} >
                <Card className='mt-10' title="Todo">
                    <Space.Compact>
                        <Input maxLength={20} placeholder='New Todo' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                        <Button icon={<PlusOutlined />} onClick={handleAddTask}>
                        </Button>
                    </Space.Compact>
                    <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                        <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
                            <Table className='mt-4'
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false} scroll={{ y: 400 }}
                                rowKey="key"
                                components={{body: {row: Row,},}} />
                        </SortableContext>
                    </DndContext>
                </Card>
            </Col>
        </div>
    );
}

export default Todo;