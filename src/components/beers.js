import React, {useState, useEffect} from 'react';
import { Layout, Modal, Input } from 'antd';
import 'antd/dist/antd.css';
import BeersService from '../service/beers-service';
import { connect } from 'react-redux';
import { beersLoaded, beersAdd, beerDelete, sortCountBeers, sortNameBeers } from '../actions/actions';
import { Button, Image } from 'antd';
import { Link } from 'react-router-dom';

const Beers = (props) => {
    const { beers, beersLoaded, beerDelete, sortCountBeers, sortNameBeers, beersAdd } = props;
    const { Content } = Layout;
    const { TextArea } = Input;
    const beersService = new BeersService();
    const { getData } = beersService;
    let element = null;

    useEffect(() => {
        getData()
        .then(beers => {
            beersLoaded(beers)
        })
    }, []);

    const [elem, setElem] = useState({
        name: '',
        ebc: '',
        description: ''    
    });

    const deleteBeer = (id) => {
        const del = window.confirm('Delete beer?');
        if (del) {
            beerDelete(id)
        } 
    }

    const sortByCount = () => {
        sortCountBeers()
    }

    const sortByName = () => {
        sortNameBeers()
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        beersAdd(elem);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEvent = e => {
        setElem({
            ...beers[0],
            ...elem,
            [e.target.name]: e.target.value
        })
    };

 
    if (beers) {
        element = beers.map((item, idx) => {
            const { id } = item;
            return <div key={idx} className="site-layout-content">
                    <div>    
                        <ul>
                            <li><span>Name:</span> {item.name}</li>
                            <li><span>Description:</span> {item.description}</li>
                            <li><span>Count:</span> {item.ebc ? item.ebc : 0}</li>
                        </ul>
                        <Link to={`/beers/${id}`}>
                            <Button type="primary">Detail</Button>
                        </Link> 
                        <Button type="primary" danger onClick={() => deleteBeer(idx)}>
                            Delete
                        </Button>
                    </div>
                    <Image
                        width={120}
                        height={280}
                        src={item.image_url}
                    />
                </div>
        });
    } 

    return(
        <Layout className="layout">
            <Content style={{ padding: '10px 50px' }}>
                <div>
                    <div className='sort-btn'>
                    <Button className='sort-btn1' type="primary" block onClick={sortByCount}>
                        Sort by count
                    </Button>
                    <Button type="primary" block onClick={sortByName}>
                        Sort by name
                    </Button>
                    </div>
                    <Button onClick={showModal} className='add-beer' type="primary" block>
                        Add beer
                    </Button>
                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input type="text" onChange={handleEvent} name="name" value={elem.name}/>
                        <Input type="number" onChange={handleEvent} name="ebc" value={elem.ebc}/>
                        <TextArea type="text" onChange={handleEvent} name="description" value={elem.description}/>
                    </Modal>
                    {element}
                </div>
            </Content>
        </Layout>
    )
};

const mapStateToProps = (state) => {
    return {
        beers: state.beers
    }
}

const mapDispatchToProps =  (dispatch) => {
    return {
        beersLoaded: (beers) => dispatch(beersLoaded(beers)),
        beersAdd: (elem) => dispatch(beersAdd(elem)),
        beerDelete: (id) => dispatch(beerDelete(id)),
        sortCountBeers: () => dispatch(sortCountBeers()),
        sortNameBeers: () => dispatch(sortNameBeers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Beers);