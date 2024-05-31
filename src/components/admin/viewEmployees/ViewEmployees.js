import React, { useEffect, useState } from "react";
import "./ViewEmployees.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

import Search from "../../search/Search";
import { Spinner } from "../../loader/Loader";
import { shortenText } from "../../../utils";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {
    FILTER_BY_SEARCH,
    selectFilteredEmployees,
} from "../../../redux/features/employee/filterSlice";
import { getUsers, deleteUser } from "../../../redux/features/auth/authSlice";

const ViewEmployees = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { users, isLoading, isError, message } = useSelector(
        (state) => state.auth
    );
    const filteredEmployees = useSelector(selectFilteredEmployees);
    
    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getUsers());
        }

        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch]);

    const delEmployee = async (id) => {
        console.log(id);
        await dispatch(deleteUser(id));
        await dispatch(getUsers());
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: "Xóa nhân viên",
            message: "Bạn có chắc chắn muốn xóa nhân viên này?",
            buttons: [
                {
                    label: "Xóa",
                    onClick: () => delEmployee(id),
                },
                {
                    label: "Hủy bỏ",
                    // onClick: () => alert('Click No')
                },
            ],
        });
    };

    // Begin Pagination
    const itemsPerPage = 6;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredEmployees.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredEmployees.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredEmployees.length;
        setItemOffset(newOffset);
    };
    // End Pagination

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({ employees: users, search }));
    }, [users, search, dispatch]);

    return (
        <div className="product-list">
            <div className="table">
                <div className="--flex-between --flex-dir-column">
                    <span>
                        <h3>Tất cả nhân viên</h3>
                        <p>
                            ~ <b>{filteredEmployees.length} nhân viên được tìm thấy</b>
                        </p>
                    </span>
                    <span>
                        <Search
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </span>
                </div>

                {isLoading && <Spinner />}

                <div className="table">
                    {!isLoading && currentItems.length === 0 ? (
                        <p>-- Không tìm thấy nhân viên...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Avatar</th>
                                    <th>CMND/CCCD</th>
                                    <th>Họ tên</th>
                                    <th>Ngày sinh</th>
                                    <th>Chức vụ</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((user, index) => {
                                    const { _id, name, photo, identity_num, dateOfBirth, position } = user;
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td><img src={photo} style={{width: "42px", height:"50px"}}/></td>
                                            <td>{identity_num}</td>
                                            <td>
                                                {name}
                                            </td>
                                            <td>{dateOfBirth.split('T')[0]}</td>
                                            <td>
                                                {position}
                                            </td>
                                            <td className="icons">
                                                <span>
                                                    <Link to={`/admin/edit-employee/${_id}`}>
                                                        <FaEdit size={20} color={"green"} />
                                                    </Link>
                                                </span>
                                                <span>
                                                    <FaTrashAlt
                                                        size={20}
                                                        color={"red"}
                                                        onClick={() => confirmDelete(_id)}
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Kế tiếp"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="Trước"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="activePage"
                />
            </div>
        </div>
    );
};

export default ViewEmployees;
