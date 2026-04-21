import React from "react";
import LikeButton from "./LikeButton.jsx";
import BookmarkButton from "./BookmarkButton.jsx";

export default function Post({ post, token }) {
    function commentToHTML(comment) {
        // console.log(comment.user.username);
        // console.log(comment.text);
        return (
            <p className="text-sm mb-3">
                <strong>{comment.user.username}</strong> {comment.text}
            </p>
        );
    }
    
    function getComments(post) {
        if (post.comments.length === 0) {
            return "";
        } else if (post.comments.length === 1) {
            return commentToHTML(post.comments[0]);
        } else {
            return (
                <>
                    <button className="text-blue-500 mb-4" aria-label="view more comments button">view all {post.comments.length} comments</button>
                    {commentToHTML(post.comments[post.comments.length - 1])}
                </>
            );
        }
    }
    
    return (
        <>
            <section className="bg-white border mb-10" id="post-${post.id}">
                <div className="p-4 flex justify-between">
                    <h3 className="text-lg font-Comfortaa font-bold">{post.user.username}</h3>
                    <button className="icon-button" aria-label="settings button"><i className="fas fa-ellipsis-h"></i></button>
                </div>
                <img src={post.image_url} alt="post image" width="300" height="300" className="w-full bg-cover" />
                <div className="p-4">
                    <div className="flex justify-between text-2xl mb-3">
                        <div>
                            <LikeButton post={post} token={token} />
                            <button aria-label="comment button"><i className="far fa-comment ml-2"></i></button>
                            <button aria-label="comment button"><i className="far fa-paper-plane ml-2"></i></button>
                        </div>
                        <div>
                            <BookmarkButton post={post} token={token}/>
                        </div>
                    </div>
                    <p className="font-bold mb-3">{post.likes.length} likes</p>
                    <div className="text-sm mb-3">
                        <p>
                            <strong>{post.user.username}</strong> {post.caption}
                        </p>
                    </div>
                    <p className="uppercase text-gray-500 text-xs mb-3">{post.display_time}</p>
                    {getComments(post)}
                </div>
                <div className="flex justify-between items-center p-3">
                    <div className="flex items-center gap-3 min-w-[80%]">
                        <i className="far fa-smile text-lg"></i>
                        <input type="text" className="min-w-[80%] focus:outline-none" placeholder="Add a comment..." aria-label="comment input" />
                    </div>
                    <button className="text-blue-500 py-2">Post</button>
                </div>
            </section>
        </>
    );
}