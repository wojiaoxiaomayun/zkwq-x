import http from '../util/fetch'

export const IsFollower = (followeeId, followerId) => { return http.get('/hky/api/v1/is-follower', {followee_id: followeeId, follower_id: followerId}) }
export const Follow = (followeeId, followerId,app_id) => { return http.post('/hky/api/v1/followers', {followee_id: followeeId, follower_id: followerId,app_id}) }
export const Disfollow = (followeeId, followerId,app_id) => { return http.delete('/hky/api/v1/followers', {followee_id: followeeId, follower_id: followerId,app_id}) }
export const ListFollowers = (followeeId, page) => { return http.get('/hky/api/v1/followers', {followee_id: followeeId, page: page}) }
export const ListFollowees = (followerId, page) => { return http.get('/hky/api/v1/followees', {follower_id: followerId, page: page}) }
