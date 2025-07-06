#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
狗狗品种科普 API 测试工具
用于测试 Netlify 部署的远程 API
"""

import requests
import json
import sys
import time
from typing import Dict, Any, Optional

class DogBreedsAPITester:
    def __init__(self, base_url: str, api_key: Optional[str] = None):
        """
        初始化API测试器
        
        Args:
            base_url: API基础URL
            api_key: API密钥（可选）
        """
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'DogBreedsAPITester/1.0',
            'Content-Type': 'application/json'
        })
    
    def apply_api_key(self, email: str) -> Dict[str, Any]:
        """
        申请API Key
        
        Args:
            email: 邮箱地址
            
        Returns:
            申请结果
        """
        url = f"{self.base_url}/.netlify/functions/apply-api-key"
        data = {"email": email}
        
        try:
            response = self.session.post(url, json=data)
            response.raise_for_status()
            result = response.json()
            
            if result.get('success'):
                self.api_key = result['apiKey']
                print(f"✅ API Key申请成功: {result['apiKey']}")
                print(f"📧 邮箱: {result['email']}")
                print("⚠️  请妥善保管您的API Key，它不会再次显示！")
            else:
                print(f"❌ API Key申请失败: {result.get('error', '未知错误')}")
            
            return result
            
        except requests.exceptions.RequestException as e:
            print(f"❌ 网络错误: {e}")
            return {"success": False, "error": str(e)}
    
    def get_dog_breed(self, breed: str) -> Dict[str, Any]:
        """
        获取狗狗品种信息
        
        Args:
            breed: 狗狗品种名称
            
        Returns:
            品种信息
        """
        if not self.api_key:
            print("❌ 请先申请API Key")
            return {"success": False, "error": "No API Key"}
        
        url = f"{self.base_url}/.netlify/functions/dog-breeds"
        params = {
            "breed": breed,
            "api_key": self.api_key
        }
        
        try:
            response = self.session.get(url, params=params)
            response.raise_for_status()
            result = response.json()
            
            if result.get('success'):
                print(f"✅ 成功获取 {breed} 信息")
                if 'usage' in result:
                    print(f"📊 API使用次数: {result['usage']['usageCount']}")
            else:
                print(f"❌ 获取 {breed} 信息失败: {result.get('error', '未知错误')}")
            
            return result
            
        except requests.exceptions.RequestException as e:
            print(f"❌ 网络错误: {e}")
            return {"success": False, "error": str(e)}
    
    def test_all_breeds(self) -> None:
        """测试所有支持的狗狗品种"""
        breeds = ["金毛", "拉布拉多", "哈士奇", "柴犬", "柯基", "边牧", "泰迪", "萨摩耶"]
        
        print("🐕 开始测试所有狗狗品种...")
        print("=" * 50)
        
        for breed in breeds:
            print(f"\n🔍 测试品种: {breed}")
            result = self.get_dog_breed(breed)
            
            if result.get('success'):
                data = result['data']
                print(f"   📝 名称: {data['name']}")
                print(f"   🌍 原产地: {data['origin']}")
                print(f"   📏 体型: {data['size']}")
                print(f"   ⏰ 寿命: {data['lifespan']}")
                print(f"   💡 特点: {', '.join(data['characteristics'][:3])}...")
            else:
                print(f"   ❌ 失败: {result.get('error', '未知错误')}")
            
            time.sleep(1)  # 避免请求过快
        
        print("\n" + "=" * 50)
        print("✅ 所有品种测试完成")
    
    def test_error_cases(self) -> None:
        """测试错误情况"""
        print("\n🧪 测试错误情况...")
        print("=" * 50)
        
        # 测试不存在的品种
        print("\n🔍 测试不存在的品种: '不存在的品种'")
        result = self.get_dog_breed("不存在的品种")
        if not result.get('success'):
            print(f"   ✅ 正确返回错误: {result.get('error', '未知错误')}")
        
        # 测试空品种
        print("\n🔍 测试空品种: ''")
        result = self.get_dog_breed("")
        if not result.get('success'):
            print(f"   ✅ 正确返回错误: {result.get('error', '未知错误')}")
        
        print("\n" + "=" * 50)
        print("✅ 错误情况测试完成")

def print_usage():
    """打印使用说明"""
    print("""
🐕 狗狗品种科普 API 测试工具

使用方法:
    python python_test_tool.py <base_url> [api_key]

参数:
    base_url    API基础URL (例如: https://your-site.netlify.app)
    api_key     API密钥 (可选，如果不提供会自动申请)

示例:
    python python_test_tool.py https://your-site.netlify.app
    python python_test_tool.py https://your-site.netlify.app dk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

功能:
    1. 申请API Key (如果未提供)
    2. 测试所有支持的狗狗品种
    3. 测试错误情况
    4. 显示详细的API响应信息
""")

def main():
    """主函数"""
    if len(sys.argv) < 2:
        print_usage()
        return
    
    base_url = sys.argv[1]
    api_key = sys.argv[2] if len(sys.argv) > 2 else None
    
    print("🚀 启动狗狗品种科普 API 测试工具")
    print(f"📍 API地址: {base_url}")
    print("=" * 60)
    
    # 创建测试器
    tester = DogBreedsAPITester(base_url, api_key)
    
    # 如果没有API Key，使用演示用的API Key
    if not api_key:
        print("🔑 检测到未提供API Key，使用演示用的API Key...")
        api_key = 'dk_test_1234567890abcdef1234567890abcdef'
        tester.api_key = api_key
        print(f"✅ 使用演示API Key: {api_key}")
    
    # 测试所有品种
    tester.test_all_breeds()
    
    # 测试错误情况
    tester.test_error_cases()
    
    print("\n🎉 测试完成！")
    print("💡 提示: 您可以将API Key保存下来，下次直接使用")

if __name__ == "__main__":
    main() 