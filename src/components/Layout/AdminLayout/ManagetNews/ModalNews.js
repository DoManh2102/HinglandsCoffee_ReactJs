import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Input } from 'antd';

const { TextArea } = Input;

function ModalNews(props) {
    const [imgUrl, setImgUrl] = useState(null)

    const [valueInput, setValueInput] = useState({
        news_name: '',
        news_img: null,
        news_time: '',
        descriptions: ''
    })

    const handleChange = (e) => {
        let copyValueInput = { ...valueInput }
        const { value, name } = e.target;
        setValueInput({
            ...copyValueInput,
            [name]: value
        })
    }

    //change file image
    const handleChangFile = (e) => {
        let file = e.target.files[0];
        const { name } = e.target
        // tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgUrl(e.target.result)
        }
        setValueInput({
            ...valueInput,
            [name]: file
        })
    }
    console.log(props.submit);
    return (
        <Modal
            show={props.showModal}
            onHide={() => props.toggleModal(false)}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm Tin Tức</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '0 0 0 50px' }}>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    encType="multipart/form-data"
                    onSubmitCapture={props.submit}
                >
                    <Form.Item label="Tên tin tức" className='mt-4'>
                        <Input name="news_name" value={valueInput.news_name} onChange={(e) => handleChange(e)} />
                    </Form.Item>
                    <Form.Item label="Hình ảnh" valuePropName="fileList">
                        <input
                            type="file"
                            name="news_img"
                            onChange={(e) => handleChangFile(e)}
                        />
                        <br />
                        {imgUrl && <div>
                            <img style={{ width: '200px' }} src={imgUrl} />
                            <br />
                            <button className='btn btn-danger' style={{ padding: '3px 5px' }} onClick={() => setImgUrl(null)}>Remove</button>
                        </div>}
                    </Form.Item>
                    <Form.Item label="Thời gian" className='mt-4'>
                        <Input name='news_time' value={valueInput.news_time} onChange={(e) => handleChange(e)} />
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <TextArea rows={4} name='descriptions' value={valueInput.descriptions} onChange={(e) => handleChange(e)} />
                    </Form.Item>
                    <div style={{ marginBottom: '20px', textAlign: 'right', marginRight: '25%' }}>
                        <button type="button" className='btn btn-dark' style={{ padding: '6px 10px' }} onClick={() => props.toggleModal(false)}>
                            Close
                        </button>
                        <button type='submit' style={{ marginLeft: '10px', padding: '5px 12px' }} className='btn btn-primary'>{props.typeBtnSubmit.title}</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalNews;