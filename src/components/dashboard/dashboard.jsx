import { Button } from 'antd';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue , child} from 'firebase/database';
import React, {useEffect , useState} from 'react';
function Dashboard() {

    const [, setTodoList] = useState([]);
    useEffect(() => {
        const db = getDatabase();
        const todoRootRef = ref(db, 'Todo');
        const todoRef = child(todoRootRef, 'todos'); 
        
        onValue(todoRef, (snapshot) => {
          const data = snapshot.val();
          setTodoList(data ? Object.values(data) : []);
        });
      }, []);

    return (
        <Row justify="center" align="middle">
            <Col span={12} >
                <h1 className='text-center'>HOME</h1>
                <Row justify="center" align="middle">

                    <Link to="/Todo">
                        <Button className='mr-2'>Todo</Button>
                    </Link>

                    <Link to="/NewFeature">
                    <Button className='ml-2'>New Feature</Button>
                    </Link>

                    <Link to="/NewFeature2">
                    <Button className='ml-2'>New Feature2</Button>
                    </Link>

                </Row>
            </Col>
        </Row>
    )
}

export default Dashboard;