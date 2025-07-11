import React from 'react';

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">聊天室</h1>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="h-96 overflow-y-auto mb-4 p-4 border rounded-lg">
            {/* 聊天消息将在这里显示 */}
            <div className="text-center text-gray-500">
              暂无消息
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="input flex-1"
              placeholder="输入消息..."
            />
            <button className="btn btn-primary">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 