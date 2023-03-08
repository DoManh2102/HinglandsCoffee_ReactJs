import React from 'react';
import Table from 'react-bootstrap/Table';
import { BiDetail } from 'react-icons/bi';

function TableBasic({ headerList, data, deleteRow, toggleModal, cartItem }) {
    return (
        <Table bordered style={{ color: '#fff' }}>
            <thead>
                <tr>
                    {headerList?.map((title, index) =>
                        <th key={index} style={{ textAlign: 'center' }}>{title.fields.toUpperCase()}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data?.map((row, index) => (
                    <tr key={index} >
                        {
                            headerList.map((column, index) => {
                                // lấy ra colum có fields đuôi _img
                                const columImg = column.fields.indexOf('_img')
                                if (columImg === -1) {  // ko có đuôi _img
                                    const tdData = row[column.fields]; // lấy ra dữ liệu
                                    return (
                                        <td key={index} style={{ width: `${column.width}` }
                                        }>
                                            {column.fields === 'price' || column.fields === 'total' ? new Intl.NumberFormat().format(tdData) + ' vnđ' : tdData}
                                            {column.btnEdit && <button onClick={() =>
                                                toggleModal(row)
                                            } className='btn btn-success ml-2 px-3'>Edit</button>}
                                            {column.btnDelete ? <button onClick={() => deleteRow(row)} className='btn btn-danger ms-2 px-2'>Delete</button> : ''}
                                            {column.btnDetail ? <BiDetail style={{ fontSize: '30px' }} onClick={() => {
                                                return (
                                                    toggleModal(true),
                                                    cartItem(row.productCart)
                                                )
                                            }} /> : ''}
                                        </td>
                                    )
                                } else {
                                    return (
                                        <td key={index} style={{ width: `${column.width}` }
                                        }>
                                            <img style={{ display: 'block', width: '150px', margin: '0 auto' }} src={row[column.fields]} />
                                        </td>
                                    )
                                }
                            })
                        }
                    </tr>
                ))}
            </tbody>
        </Table >
    );
}

export default TableBasic;