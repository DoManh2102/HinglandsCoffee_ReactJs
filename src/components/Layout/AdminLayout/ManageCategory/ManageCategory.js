import React, { useState, useEffect } from 'react';
import TableBasic from '../../../comon/TableBasic/TableBasic';
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Input } from 'antd';
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { addCategoryAction, deleteCategoryAction, getCategoryListAction } from '../../../../redux/action/CategoryAction';


const headerList = [
    { fields: 'id', },
    { fields: 'category_name', },
    { fields: 'category_img', },
    { fields: 'description', width: '50%' },
    { fields: '', btnCreate: true, btnEdit: true, btnDelete: true, width: '170px' },
]

const { TextArea } = Input;

function ManageCategory(props) {
    // lấy dữ liệu từ reducer
    let { categorys } = useSelector(state => state.CategoryReducer)

    // render img
    const [imgUrl, setImgUrl] = useState(null)

    // toger modal
    const [show, setShow] = useState(false);

    // dispatch
    const dispatch = useDispatch()

    // render product khi load trang
    useEffect(() => {
        const action = getCategoryListAction();
        dispatch(action)
    }, [])

    //form atnd
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    //formik data
    const formik = useFormik({
        initialValues: {
            category_name: '',
            category_img: {},
            description: '',
        },

        onSubmit: (values) => {
            console.log(values);
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'category_img') {
                    formData.append(key, values[key])
                }
                else {
                    formData.append(key, values.category_img, values.category_img.name)
                }
            }
            dispatch(addCategoryAction(formData))
            setShow(false); // đóng modal
            setImgUrl(null); // reset img
        }
    })

    //change file image
    const handleChangFile = (e) => {
        let file = e.target.files[0];

        // tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgUrl(e.target.result)
        }
        // đem file gửi vào formik
        formik.setFieldValue('category_img', file)
    }

    const deleteCategory = (id) => {
        Swal.fire({
            title: 'Bạn có muốn xoá?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategoryAction(id))
                Swal.fire('Success', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <div id="layoutSidenav_content" >
            <div className="container-fluid px-4">
                <h1 className="text-info mt-4">Quản lý sản phẩm</h1>
                <>
                    <Button className='mb-2 btn-primary' onClick={() => setShow(true)}>
                        Thêm
                    </Button>
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        backdrop="static"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm Loại Sản Phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '0 0 0 50px' }}>
                            <Form onSubmitCapture={formik.handleSubmit}
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                enctype="multipart/form-data"
                            >
                                <Form.Item label="Tên loại" className='mt-4'>
                                    <Input name="category_name" onChange={formik.handleChange} />
                                </Form.Item>
                                <Form.Item label="Hình ảnh" valuePropName="fileList">
                                    <input
                                        type="file"
                                        name="category_img"
                                        onChange={(e) => handleChangFile(e)}
                                    />
                                    <br />
                                    {imgUrl ? <div>
                                        <img style={{ width: '200px' }} src={imgUrl} />
                                        <br />
                                        <button className='btn btn-danger' style={{ padding: '3px 5px' }} onClick={() => setImgUrl(null)}>Remove</button>
                                    </div> : null}
                                </Form.Item>
                                <Form.Item label="Mô tả">
                                    <TextArea rows={4} name='description' onChange={formik.handleChange} />
                                </Form.Item>
                                <div style={{ marginBottom: '20px', textAlign: 'right', marginRight: '25%' }}>
                                    <button className='btn btn-dark' style={{ padding: '6px 10px' }} onClick={() => setShow(false)}>
                                        Close
                                    </button>
                                    <button type='submit' style={{ marginLeft: '10px', padding: '5px 12px' }} className='btn btn-primary'>Save</button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
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
                    <TableBasic headerList={headerList} data={categorys} deleteRow={deleteCategory} />
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

export default ManageCategory;