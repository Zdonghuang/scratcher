/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var should = require("should");
var when = require("when");
var sinon = require("sinon");

var passport = require("passport");

var auth = require("../../../../red/api/auth");
var Users = require("../../../../red/api/auth/users");
var Tokens = require("../../../../red/api/auth/tokens");

describe("api/auth/index",function() {



    describe("ensureClientSecret", function() {
        before(function() {
            auth.init({settings:{},log:{audit:function(){}}})
        });
        it("leaves client_secret alone if not present",function(done) {
            var req = {
                body: {
                    client_secret: "test_value"
                }
            };
            auth.ensureClientSecret(req,null,function() {
                req.body.should.have.a.property("client_secret","test_value");
                done();
            })
        });
        it("applies a default client_secret if not present",function(done) {
            var req = {
                body: { }
            };
            auth.ensureClientSecret(req,null,function() {
                req.body.should.have.a.property("client_secret","not_available");
                done();
            })
        });
    });

    describe("revoke", function() {
        it("revokes a token", function(done) {
            var revokeToken = sinon.stub(Tokens,"revoke",function() {
                return when.resolve();
            });

            var req = { body: { token: "abcdef" } };

            var res = { status: function(resp) {
                revokeToken.restore();

                resp.should.equal(200);
                return {
                    end: done
                }
            }};

            auth.revoke(req,res);
        });
    });

    describe("login", function() {
        beforeEach(function() {
            sinon.stub(Tokens,"init",function(){});
            sinon.stub(Users,"init",function(){});
        });
        afterEach(function() {
            Tokens.init.restore();
            Users.init.restore();
        });
        it("returns login details - credentials", function(done) {
            auth.init({settings:{adminAuth:{type:"credentials"}},log:{audit:function(){}}})
            auth.login(null,{json: function(resp) {
                resp.should.have.a.property("type","credentials");
                resp.should.have.a.property("prompts");
                resp.prompts.should.have.a.lengthOf(2);
                done();
            }});
        });
        it("returns login details - none", function(done) {
            auth.init({settings:{},log:{audit:function(){}}})
            auth.login(null,{json: function(resp) {
                resp.should.eql({});
                done();
            }});
        });
        it("returns login details - strategy", function(done) {
            auth.init({settings:{adminAuth:{type:"strategy",strategy:{label:"test-strategy",icon:"test-icon"}}},log:{audit:function(){}}})
            auth.login(null,{json: function(resp) {
                resp.should.have.a.property("type","strategy");
                resp.should.have.a.property("prompts");
                resp.prompts.should.have.a.lengthOf(1);
                resp.prompts[0].should.have.a.property("type","button");
                resp.prompts[0].should.have.a.property("label","test-strategy");
                resp.prompts[0].should.have.a.property("icon","test-icon");

                done();
            }});
        });

    });

});
