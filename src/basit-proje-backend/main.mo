actor {
    type Post = {
        id: Nat;
        title: Text;
        content: Text;
        createdAt: Time;
    };

    var posts: [Post] = [];
    var nextId: Nat = 0;

    public func addPost(title: Text, content: Text): async Post {
        let post = {
            id = nextId;
            title = title;
            content = content;
            createdAt = Time.now();
        };
        posts := posts # [post];
        nextId += 1;
        return post;
    };

    public func getPosts(): async [Post] {
        return posts;
    };

    public func updatePost(id: Nat, title: Text, content: Text): async ?Post {
        posts := Array.map(posts, func(post) {
            if (post.id == id) {
                return {
                    id = post.id;
                    title = title;
                    content = content;
                    createdAt = post.createdAt;
                };
            };
            return post;
        });
        return posts #? { id = id };
    };

    public func deletePost(id: Nat): async Bool {
        let initialSize = Array.size(posts);
        posts := Array.filter(posts, func(post) {
            post.id != id
        });
        return Array.size(posts) < initialSize;
    };
};
