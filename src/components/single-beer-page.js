import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Tooltip, Modal, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { beersChanged } from '../actions/actions';
import BeersService from '../service/beers-service';


const SinglePageBeer = (props) => {   
    const { TextArea } = Input;
    const { itemId, beersChanged, beers } = props;
    const beersService = new BeersService();
    const { getComment } = beersService;
    const [beer, setBeer] = useState({
        description: '',
        count: '',
        alcohol: '',
        first_brewed: '',
        brewers_tips: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        const obj = beers.findIndex(item => item.id == itemId);
        beersChanged(beer, obj);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        const obj = beers.find(item => item.id == itemId);
        if(obj.isAddedNews) {
            setBeer(obj)
        } else {
        getComment(itemId)
        .then(data => setBeer({...data[0], comments: []}))
        }
    }, [])

    const handleEvent = e => {
        setBeer({
            ...beer,
            [e.target.name]: e.target.value
        })
    };

    console.log(beer)

    if (beer) {
            return (
                <div className='beer-details'>
                    <img src={beer.image_url}/>
                    <div>
                        <ul>
                            <li><span>Description: </span>{beer.description}</li>
                            <li>
                                <ul>
                                    <span></span>
                                    <li><span>Count: </span>{beer.ebc}</li>
                                    <li><span>Alcohol: </span>{beer.abv}</li>
                                    <li><span>First brewed: </span>{beer.first_brewed}</li>
                                </ul>
                            </li>                       
                            <li><span>Comment: </span>{beer.brewers_tips}</li>
                        </ul>
                        <Tooltip className='edit' title="edit">
                            <Button type="primary" onClick={showModal} shape="circle" icon={<EditOutlined />} />
                        </Tooltip>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <TextArea type="text" onChange={handleEvent} name="description" value={beer.description}/>
                            <Input type="number" onChange={handleEvent} name="ebc" value={beer.ebc}/>
                            <Input type="text" onChange={handleEvent} name="abv" value={beer.abv}/>
                            <Input type="text" onChange={handleEvent} name="first_brewed" value={beer.first_brewed}/>
                            <TextArea type="text" onChange={handleEvent} name="brewers_tips" value={beer.brewers_tips}/>
                        </Modal>
                    </div>          
                </div>
            )
    }

    return <></>
};

const mapStateToProps = (state) => {
    return {
        beers: state.beers
    }
};

const mapDispatchToProps = (dispatch) => {
    return { 
        beersChanged: (beer, itemId) => dispatch(beersChanged(beer, itemId))  
    }    
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePageBeer);