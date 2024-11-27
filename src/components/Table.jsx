import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPost } from "../features/post/postSlice";

function Table({ handleEdit }) {
    const { posts, error, loading } = useSelector((state) => state.post);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPost());
    }, [dispatch]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "1rem" }}>Loading...</div>
        );
    }

    if (error) {
        return (
            <div style={{ color: "red", textAlign: "center" }}>{error.message}</div>
        );
    }

    return (
        <>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="col-12 col-sm-6 col-md-4 col-lg-3 my-3 d-flex justify-content-center"
                        >
                            <div
                                className="card"
                                style={{
                                    width: "100%",
                                    maxWidth: "18rem",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                }}
                            >
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontWeight: "bold" }}>
                                        {post.title}
                                    </h5>
                                    <p className="card-text" style={{ color: "#555" }}>
                                        {post.description}
                                    </p>
                                    <button
                                        onClick={() => dispatch(deletePost(post.id))}
                                        type="button"
                                        className="btn btn-danger"
                                        style={{ marginRight: "0.5rem" }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEdit(post)}
                                        type="button"
                                        className="btn btn-secondary"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Table;