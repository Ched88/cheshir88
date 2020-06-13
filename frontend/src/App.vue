<template>
    <div id="app">
        <div id="chatForm">
            <form action="" method="post">
                <div class="chat-window">

                    <div class="nav-panel">
                            <ul class="">
                              <li class="item" v-on:click="dataUri = 'global_chat'"><a href="#"><span>Global chat</span></a></li>
                              <li class="item" v-on:click="dataUri = 'my_profile'"><a href="#"><span>My profile</span></a></li>
                              <li class="item" v-on:click="dataUri = 'my_friends'"><a href="#"><span>My friends</span></a></li>
                              <li class="item" v-on:click="logout()"><a href="#"><span>Logout</span></a></li>
                            </ul>
                    </div>
                    <div class="chat">
                        <div v-if="dataUri === 'global_chat'">    
                            <div class="chat-list">
                                  <li v-for="item in messages" :key="item._id">
                                <b>{{ item.fromName }}:</b> {{ item.text }}
                                </li>
                            </div>
                            <div class="input-area">
                            <div class="input-wrapper"><input v-model="globalChatText" type="textarea" value="" placeholder="write something..."></div>
                            <input v-on:click="sendMessage(globalChatText)" type="button" value="Send" class="send-btn">
                            </div>
                        </div>
                        <div v-if="dataUri === 'my_profile'">
                           <div class="profile-window">
                            <div class="input-area-profile">
                                <div><span class="span-profile">Status</span></div>
                                    <div class="input-status">
                                        <div class="input-wrapper-profile"><input v-model="user.status" type="textarea" value="" placeholder="write something..."></div>
                                    </div>
                                        <div><span class="span-profile">Name</span></div>
                                <div class="input-name">
                                    <div class="input-wrapper-profile"><input v-model="user.name" type="textarea" value="" placeholder="write something..." ></div>
                                </div>
                                        <div><span class="span-profile">City</span></div>
                                <div class="input-city">
                                        <div class="input-wrapper-profile"><input v-model="user.city" type="textarea" value="" placeholder="write something..."></div>
                                </div>
                                        <div><span class="span-profile">Phone number</span></div>
                                <div class="input-phone-number">
                                        <div class="input-wrapper-profile"><input v-model="user.phone" type="tel" value="" placeholder="write something..."></div>
                                </div>
                                        <div><span class="span-profile">Email</span></div>
                                <div class="input-email">
                                        <div class="input-wrapper-profile"><input v-model="user.email" type="email" value="" placeholder="write something..."></div>
                                </div>
                                <input type="button" value="Submit" class="submit-btn-profile" v-on:click="submitUserData()" >
                            </div>
                        </div>
                        </div>

                        <div v-if="dataUri === 'my_friends'">
                            <div class="friend-window">
                             {{user.name}} friends:
                              <ul>
                                <li clas v-for="item in user.friends" :key="item.id" v-on:click="dataUri = 'friend_profile'">
                                    <a class="friedns-list" href="#"><span>{{ item.name }}</span></a>
                                </li>
                              </ul>
                            </div> 
                        </div>

                        <div v-if="dataUri === 'friend_profile'">
                            <div class="profile-window">
                                <div class="input-area-friend-profile">
                                    <div><span class="span-friend-profile">Status</span></div>
                                        <div class="input-status">
                                            <div class="input-wrapper-friend-profile"><input type="textarea" readonly value="" ></div>
                                        </div>
                                            <div><span class="span-friend-profile">Name</span></div>
                                    <div class="input-name">
                                        <div class="input-wrapper-friend-profile"><input type="textarea" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-friend-profile">City</span></div>
                                    <div class="input-city">
                                            <div class="input-wrapper-friend-profile"><input type="textarea" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-friend-profile">Phone number</span></div>
                                    <div class="input-phone-number">
                                            <div class="input-wrapper-friend-profile"><input type="tel" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-friend-profile">Email</span></div>
                                    <div class="input-email">
                                            <div class="input-wrapper-friend-profile"><input type="email" readonly value="" ></div>
                                    </div>
                                    <input type="button" v-on:click="dataUri = 'global_chat'" value="Open private chat" class="open-privateChat-btn">
                                    <input type="button" value="+ Add to friends" class="add-to-friends-btn">
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="online-list">
                        <span class="span-online-users">Users now online</span>
                        <li class="online-list-item" v-for="item in userList" :key="item._id">
                        <a v-on:click="dataUri = 'someone_profile'" class="online-list-a">{{ item.name }}</a>
                        </li>
                    </div>
                     <div v-if="dataUri === 'someone_profile'">
                         <div class="someone-profile-window">
                                <div class="input-area-someone-profile">
                                    <div><span class="span-someone-profile">Status</span></div>
                                        <div class="input-status">
                                            <div class="input-wrapper-someone-profile"><input type="textarea" readonly value="" ></div>
                                        </div>
                                            <div><span class="span-someone-profile">Name</span></div>
                                    <div class="input-name">
                                        <div class="input-wrapper-someone-profile"><input type="textarea" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-someone-profile">City</span></div>
                                    <div class="input-city">
                                            <div class="input-wrapper-someone-profile"><input type="textarea" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-someone-profile">Phone number</span></div>
                                    <div class="input-phone-number">
                                            <div class="input-wrapper-someone-profile"><input type="tel" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-someone-profile">Email</span></div>
                                    <div class="input-email">
                                            <div class="input-wrapper-someone-profile"><input type="email" readonly value="" ></div>
                                    </div>
                                    <input type="button" v-on:click="dataUri = 'global_chat'" value="Open private chat" class="open-privateChat-btn">
                                    <input type="button" value="+ Add to friends" class="add-to-friends-btn">
                                </div>
                            </div>
                     </div>
                    
                </div>
            </form>
        </div>
    </div> 
</template>

<script>
    const axios = require('axios');
    const backendUrl = 'http://192.168.31.6:3000';
    const backendWS = 'ws://192.168.31.6:3000';

    export default {
        data: function () {
            return {
                connection: null,
                dataUri: 'global_chat',

                userId: null,
                usertToken: null,
                user: null,
                friend: {},
                globalChatText: '',
                privateChatText: '',
                
                userList: [],
                messages: [],
                private_messages: {},
            };
        },

        created() {
            this.userId = $cookies.get('userId');
            this.usertToken = $cookies.get('userToken');

            if (this.usertToken === null) {
                window.location.href = '/loginForm.html';
            } else {
                this.connection = new WebSocket(`${backendWS}/chat/${this.userId}`);
                this.connection.onmessage = (event) => {
                    this.onMessageReceived(JSON.parse(event.data));
                };
            }
        },

        mounted() {
            axios.defaults.withCredentials = true;

            axios.get(`${backendUrl}/users/`)
                .then(response => { this.userList = response.data });
            axios.get(`${backendUrl}/messages/`)
                .then(response => { this.messages = response.data });
            axios.get(`${backendUrl}/users/${this.userId}`)
                .then(response => { this.user = response.data });
            // axios.get(`${backendUrl}/messages/5eca6d7ac4af8618503b323e/5eca7240b50de606c084494b`)
            //     .then(response => {this.private_messages = response.data});
        },

        methods: {
            logout() {
                $cookies.remove('userToken');
                window.location.href = '/loginForm.html';
            },
            submitUserData() {
                axios.post(`${backendUrl}/users/${this.userId}`, this.user);
            },
            sendMessage(text) {
                this.connection.send(JSON.stringify({
                    from: this.userId,
                    type: 'public',
                    text: text,
                }));
            },
            sendPrivateMessage(text) {
                this.connection.send(JSON.stringify({
                    from: this.userId,
                    to: this.someone.id,
                    type: 'private',
                    text: text,
                }));
            },
            onMessageReceived(data) {
                console.log('ZZZ:');

                if (data.type === 'public') {
                    console.log('New public message from:', data.from, ', data:', data);
                    this.messages.push(data);
                } else if (data.type === 'private') {
                    let friend = data.from === this.userId ? data.to : data.from;
                    if (!this.private_messages[friend]) {
                        this.private_messages[friend] = [];
                    }
                    console.log('New private message from:', friend, ', data:', data);
                    this.private_messages[friend].push(data);
                }
            },
        },
    };
</script>

<style>
    @import './App.css';
</style>
