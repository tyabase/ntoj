import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import type { AxiosError } from 'axios'
import { message } from 'antd'
import type { HttpResponse } from '../lib/Http.tsx'
import { http } from '../lib/Http.tsx'

export const UserProfilePage: React.FC = () => {
  const { username } = useParams()
  const { data } = useSWR(`/user/${username ?? ''}`, async (path) => {
    return http.get<User>(path)
      .then(res => res.data.data)
      .catch((err: AxiosError<HttpResponse>) => {
        void message.error(err.response?.data.message ?? '获取用户信息失败')
        throw err
      })
  })
  return (
    <div className="h-[calc(100vh-64px-80px)] flex justify-center items-center">
      <div className="bg-white w-[700px] h-[500px] border border-solid border-[#e0e0e0] rounded-2xl shadow">
        <div className="m-[20px] flex justify-between items-center">
          <div >
            <div className="text-xl font-bold">{data?.realName}</div>
            <div>@{data?.username}</div>
            <div>{data?.registerAt}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
