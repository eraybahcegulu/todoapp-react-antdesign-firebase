import Home from '../home/home';
import { Col, Card } from 'antd';
function New() {

    return (
        <div>
            <Home></Home>
            <Col span={12} offset={6}>
                <Card className='mt-10' title="New">
                    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                        Inner Card content
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="Inner Card title"
                        extra={<a href="#">More</a>}>
                        Inner Card content
                    </Card>
                </Card>
            </Col>
        </div>


    )
  }
  
  export default New;