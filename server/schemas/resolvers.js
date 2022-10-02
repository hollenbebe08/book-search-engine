const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers ={
    Query: {
        me: async(parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                // .select('-__v -book')
      
              return userData;
            }
      
            throw new AuthenticationError('Not logged in'); 
        },
        users: async () => {
            return User.find()
              .select('-__v -password')
            //   .populate('books')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
            //   .populate('books')
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, saveBookInput, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.use._id },
                    { $addToSet: { savedBooks: saveBookInput } },
                    { new: true }
                )
                return updatedUser;
            }
        },
        removeBook: async (parent, bookId, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user.id },
                    { $removeFromSet: { savedBooks: bookId } },
                    { new: true }
                )
                return updatedUser;
            }
        },
    }
};

module.exports = resolvers;
