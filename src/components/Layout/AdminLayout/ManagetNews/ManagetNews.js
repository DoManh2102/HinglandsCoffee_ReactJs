import React, { Fragment, useState, useEffect } from 'react';
import TableBasic from '../../../comon/TableBasic/TableBasic';
import { useSelector, useDispatch } from 'react-redux'
import { addNewsAction, deleteNewsAction, getNewsLisAction, updateNewsAction } from '../../../../redux/action/NewsAction';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Input } from 'antd';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
// import ModalNews from './ModalNews';
const { TextArea } = Input;

const headerList = [
    { fields: 'id', },
    { fields: 'news_name', },
    { fields: 'news_img', },
    { fields: 'news_time', },
    { fields: 'descriptions', width: '50%' },
    { fields: '', btnCreate: true, btnEdit: true, btnDelete: true, width: '170px' },
]

function ManagetNews(props) {
    const { newList } = useSelector(state => state.NewsReducer)
    const [displayData, setDisplayData] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [paginationInfo, setPaginationInfo] = useState({ currentItem: 1, pageCount: 0, itemOffset: 0 })

    useEffect(() => {
        const endOffset = paginationInfo.itemOffset + itemsPerPage;

        setDisplayData(newList.slice(paginationInfo.itemOffset, endOffset))
        setPaginationInfo((prev) => ({
            ...prev,
            pageCount: Math.ceil(newList.length / itemsPerPage)
        }))
    }, [newList, itemsPerPage, paginationInfo.itemOffset])

    const handleClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % newList.length;
        setPaginationInfo((prev) => (
            {
                ...prev,
                itemOffset: newOffset
            }
        ));
    }

    // toger modal
    const [show, setShow] = useState(false);
    // render img
    const [imgUrl, setImgUrl] = useState(null)
    //button submit
    let [btnSubmit, setBtnSubmit] = useState({
        title: '',
        handle: ''
    })
    // console.log(btnSubmit);

    let [valueInput, setValueInput] = useState({
        news_name: '',
        news_img: null,
        news_time: '',
        descriptions: ''
    })

    const dispatch = useDispatch()
    // render news khi load trang
    useEffect(() => {
        dispatch(getNewsLisAction())
    }, [])

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

    const formData = new FormData()
    const handleAddNews = () => {
        for (let key in valueInput) {
            if (key !== 'news_img') {
                formData.append(key, valueInput[key])
            }
            else {
                formData.append(key, valueInput.news_img, valueInput.news_img.name)
            }
        }
        dispatch(addNewsAction(formData))
        setShow(false); // đóng modal
        setValueInput(''); // reset img
    }

    const handleToggleModalEdit = (news) => {
        setBtnSubmit({
            title: 'Save',
            handle: handleUpdateNews
        })
        setShow(true)
        setValueInput(news)
        setImgUrl(news.news_img)
    }

    const handleUpdateNews = () => {
        console.log('valueInput', valueInput);
        dispatch(updateNewsAction(valueInput, valueInput.id))
        // let formData = new FormData()    
        // for (let key in valueInput) {
        //     if (key !== 'news_img') {
        //         formData.append(key, valueInput[key])
        //     }
        //     // else {
        //     //     dataForm.append(key, valueInput.news_img, valueInput.news_img.name)
        //     // }
        // }
        // dispatch(updateNewsAction(formData, valueInput.id))
        setShow(false); // đóng modal
        setImgUrl(null); // reset img
    }

    const handleDeleteNews = (id) => {
        dispatch(deleteNewsAction(id))
    }

    return (
        <div id="layoutSidenav_content" >
            <div className="container-fluid px-4">
                <h1 className="text-info mt-4">Quản lý tin tức</h1>
                <Fragment>
                    <Button className='mb-2 btn-primary' onClick={() => {
                        setBtnSubmit({
                            title: "Add new",
                            handle: handleAddNews
                        })
                        setShow(true)
                    }}>
                        Thêm
                    </Button>
                    {/* <ModalNews
                        showModal={show}
                        toggleModal={setShow}
                        typeBtnSubmit={btnSubmit}
                        submit={handleAddNews}
                    /> */}
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
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
                            // onSubmitCapture={handleUpdateNews}
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
                                    <button type="button" className='btn btn-dark' style={{ padding: '6px 10px' }} onClick={() => setShow(false)}>
                                        Close
                                    </button>
                                    <button onClick={btnSubmit.title === 'Add new' ? handleAddNews : handleUpdateNews} style={{ marginLeft: '10px', padding: '5px 12px' }} className='btn btn-primary'>{btnSubmit.title}</button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Fragment>
                <div className="row d-flex justify-content-between mb-2">
                    <div className="col-md-3">
                        <form >
                            <div className="input-group rounded">
                                <input type="search" ng-model="timkiem" name="keyword" id="keyword" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <button type="submit" className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search" /> Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card mb-4">
                    <TableBasic headerList={headerList} data={displayData} toggleModal={handleToggleModalEdit} deleteRow={handleDeleteNews} />
                </div>
                <div className='paginate d-flex justify-content-center'>
                    <ReactPaginate
                        {...paginationInfo}
                        onPageChange={handleClick}
                        nextLabel=">"
                        previousLabel="<"
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                </div>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright © Your Website 2021</div>
                        </div>
                    </div>
                </footer>
            </div >
        </div >
    );
}

export default ManagetNews;