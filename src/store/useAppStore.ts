'use client';

import { useState, useCallback } from 'react';
import type { FormFactor, ProjectCategory, PipelineStep, ChatMessage, HistoryItem, GeneratedProduct } from '@/types';

const DEFAULT_PIPELINE: PipelineStep[] = [
  { id: 'input', label: 'Input Encoding', status: 'pending' },
  { id: 'context', label: 'Context Understanding', status: 'pending' },
  { id: 'reasoning', label: 'Reasoning', status: 'pending' },
  { id: 'knowledge', label: 'Knowledge Retrieval', status: 'pending' },
  { id: 'generation', label: 'Generation', status: 'pending' },
];

const SAMPLE_HISTORY: HistoryItem[] = [
  { id: '1', title: 'Financial Insights Prod...', timestamp: new Date() },
  { id: '2', title: 'Show me my monthly...', timestamp: new Date() },
  { id: '3', title: 'Show me my monthly...', timestamp: new Date() },
  { id: '4', title: 'Show me my monthly...', timestamp: new Date() },
  { id: '5', title: 'Show me my monthly...', timestamp: new Date() },
  { id: '6', title: 'Show me my monthly...', timestamp: new Date() },
];

const PRODUCT_TEMPLATES: Record<FormFactor, string> = {
  mobile: `
    <div style="font-family: system-ui; background: #f8fafc; min-height: 100%; padding: 0;">
      <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 48px 20px 24px; border-radius: 0 0 24px 24px;">
        <h2 style="margin: 0 0 4px; font-size: 14px; opacity: 0.8;">Good morning,</h2>
        <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 700;">John Mike</h1>
        <div style="background: rgba(255,255,255,0.15); border-radius: 16px; padding: 16px;">
          <div style="font-size: 12px; opacity: 0.8;">Total Balance</div>
          <div style="font-size: 28px; font-weight: 700; margin: 4px 0;">$24,562.80</div>
          <div style="font-size: 12px; color: #86efac;">↑ +2.4% this month</div>
        </div>
      </div>
      <div style="padding: 20px;">
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <div style="flex:1; background: white; border-radius: 16px; padding: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <div style="width: 40px; height: 40px; background: #e0e7ff; border-radius: 12px; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">💳</div>
            <div style="font-size: 12px; color: #6b7280;">Send</div>
          </div>
          <div style="flex:1; background: white; border-radius: 16px; padding: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <div style="width: 40px; height: 40px; background: #e0e7ff; border-radius: 12px; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">📊</div>
            <div style="font-size: 12px; color: #6b7280;">Invest</div>
          </div>
          <div style="flex:1; background: white; border-radius: 16px; padding: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <div style="width: 40px; height: 40px; background: #e0e7ff; border-radius: 12px; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">📱</div>
            <div style="font-size: 12px; color: #6b7280;">Pay</div>
          </div>
          <div style="flex:1; background: white; border-radius: 16px; padding: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <div style="width: 40px; height: 40px; background: #e0e7ff; border-radius: 12px; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">⚙️</div>
            <div style="font-size: 12px; color: #6b7280;">More</div>
          </div>
        </div>
        <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600;">Recent Transactions</h3>
        <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <div style="padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; background: #fef3c7; border-radius: 10px; display: flex; align-items: center; justify-content: center;">🛒</div>
              <div><div style="font-size: 14px; font-weight: 500;">Grocery Store</div><div style="font-size: 12px; color: #9ca3af;">Today</div></div>
            </div>
            <div style="font-size: 14px; font-weight: 600; color: #ef4444;">-$45.20</div>
          </div>
          <div style="padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; background: #dcfce7; border-radius: 10px; display: flex; align-items: center; justify-content: center;">💰</div>
              <div><div style="font-size: 14px; font-weight: 500;">Salary Deposit</div><div style="font-size: 12px; color: #9ca3af;">Yesterday</div></div>
            </div>
            <div style="font-size: 14px; font-weight: 600; color: #22c55e;">+$3,200.00</div>
          </div>
          <div style="padding: 14px 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; background: #ede9fe; border-radius: 10px; display: flex; align-items: center; justify-content: center;">☕</div>
              <div><div style="font-size: 14px; font-weight: 500;">Coffee Shop</div><div style="font-size: 12px; color: #9ca3af;">2 days ago</div></div>
            </div>
            <div style="font-size: 14px; font-weight: 600; color: #ef4444;">-$5.80</div>
          </div>
        </div>
      </div>
    </div>
  `,
  tablet: `
    <div style="font-family: system-ui; background: #f8fafc; min-height: 100%; padding: 0;">
      <div style="background: white; border-bottom: 1px solid #e5e7eb; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 20px; font-weight: 700; color: #4f46e5;">FinanceHub</div>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-size: 14px; color: #6b7280;">John Mike</span>
          <div style="width: 36px; height: 36px; background: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 600;">JM</div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 24px;">
        <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 20px; padding: 24px; color: white; grid-column: span 2;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 14px; opacity: 0.8; margin-bottom: 4px;">Portfolio Value</div>
              <div style="font-size: 32px; font-weight: 700;">$124,562.80</div>
              <div style="font-size: 14px; color: #86efac; margin-top: 4px;">↑ +12.4% this quarter</div>
            </div>
            <div style="display: flex; gap: 12px;">
              <div style="background: rgba(255,255,255,0.2); border-radius: 12px; padding: 12px 20px; font-size: 14px; cursor: pointer;">Deposit</div>
              <div style="background: white; color: #4f46e5; border-radius: 12px; padding: 12px 20px; font-size: 14px; font-weight: 600; cursor: pointer;">Withdraw</div>
            </div>
          </div>
        </div>
        <div style="background: white; border-radius: 16px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Spending Overview</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div><div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;"><span>Housing</span><span>$1,200</span></div><div style="background: #e5e7eb; border-radius: 4px; height: 8px;"><div style="background: #4f46e5; height: 100%; border-radius: 4px; width: 75%;"></div></div></div>
            <div><div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;"><span>Food</span><span>$480</span></div><div style="background: #e5e7eb; border-radius: 4px; height: 8px;"><div style="background: #8b5cf6; height: 100%; border-radius: 4px; width: 45%;"></div></div></div>
            <div><div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;"><span>Transport</span><span>$320</span></div><div style="background: #e5e7eb; border-radius: 4px; height: 8px;"><div style="background: #a78bfa; height: 100%; border-radius: 4px; width: 30%;"></div></div></div>
            <div><div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;"><span>Entertainment</span><span>$180</span></div><div style="background: #e5e7eb; border-radius: 4px; height: 8px;"><div style="background: #c4b5fd; height: 100%; border-radius: 4px; width: 18%;"></div></div></div>
          </div>
        </div>
        <div style="background: white; border-radius: 16px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Investments</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
              <div><div style="font-size: 14px; font-weight: 500;">AAPL</div><div style="font-size: 12px; color: #9ca3af;">Apple Inc.</div></div>
              <div style="text-align: right;"><div style="font-size: 14px; font-weight: 600;">$178.20</div><div style="font-size: 12px; color: #22c55e;">+1.2%</div></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
              <div><div style="font-size: 14px; font-weight: 500;">MSFT</div><div style="font-size: 12px; color: #9ca3af;">Microsoft Corp.</div></div>
              <div style="text-align: right;"><div style="font-size: 14px; font-weight: 600;">$412.50</div><div style="font-size: 12px; color: #22c55e;">+0.8%</div></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
              <div><div style="font-size: 14px; font-weight: 500;">TSLA</div><div style="font-size: 12px; color: #9ca3af;">Tesla Inc.</div></div>
              <div style="text-align: right;"><div style="font-size: 14px; font-weight: 600;">$245.80</div><div style="font-size: 12px; color: #ef4444;">-0.5%</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  desktop: `
    <div style="font-family: system-ui; background: #f8fafc; min-height: 100%;">
      <div style="background: white; border-bottom: 1px solid #e5e7eb; padding: 12px 32px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="font-size: 18px; font-weight: 700; color: #4f46e5;">FinanceHub Pro</span>
          <nav style="display: flex; gap: 24px; font-size: 14px; color: #6b7280;">
            <span style="color: #4f46e5; font-weight: 500;">Dashboard</span>
            <span>Accounts</span>
            <span>Investments</span>
            <span>Analytics</span>
            <span>Settings</span>
          </nav>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-size: 14px; color: #6b7280;">John Mike</span>
          <div style="width: 32px; height: 32px; background: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 600;">JM</div>
        </div>
      </div>
      <div style="padding: 24px 32px;">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
            <div style="font-size: 13px; color: #9ca3af; margin-bottom: 4px;">Total Balance</div>
            <div style="font-size: 24px; font-weight: 700;">$124,562</div>
            <div style="font-size: 12px; color: #22c55e; margin-top: 4px;">↑ +2.4%</div>
          </div>
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
            <div style="font-size: 13px; color: #9ca3af; margin-bottom: 4px;">Monthly Income</div>
            <div style="font-size: 24px; font-weight: 700;">$8,450</div>
            <div style="font-size: 12px; color: #22c55e; margin-top: 4px;">↑ +5.1%</div>
          </div>
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
            <div style="font-size: 13px; color: #9ca3af; margin-bottom: 4px;">Expenses</div>
            <div style="font-size: 24px; font-weight: 700;">$3,280</div>
            <div style="font-size: 12px; color: #ef4444; margin-top: 4px;">↑ +1.2%</div>
          </div>
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
            <div style="font-size: 13px; color: #9ca3af; margin-bottom: 4px;">Savings Rate</div>
            <div style="font-size: 24px; font-weight: 700;">61.2%</div>
            <div style="font-size: 12px; color: #22c55e; margin-top: 4px;">↑ +3.8%</div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
            <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Revenue Analytics</h3>
            <div style="display: flex; align-items: end; gap: 8px; height: 120px;">
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 40%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 60%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 45%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 80%;"></div>
              <div style="flex: 1; background: #4f46e5; border-radius: 4px 4px 0 0; height: 95%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 70%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 55%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 85%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 65%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 90%;"></div>
              <div style="flex: 1; background: #e0e7ff; border-radius: 4px 4px 0 0; height: 75%;"></div>
              <div style="flex: 1; background: #c7d2fe; border-radius: 4px 4px 0 0; height: 100%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: #9ca3af;">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
            <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Top Holdings</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 8px; height: 8px; background: #4f46e5; border-radius: 50%;"></div><span style="font-size: 13px;">S&P 500 ETF</span></div>
                <span style="font-size: 13px; font-weight: 600;">42%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%;"></div><span style="font-size: 13px;">Tech Stocks</span></div>
                <span style="font-size: 13px; font-weight: 600;">28%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 8px; height: 8px; background: #a78bfa; border-radius: 50%;"></div><span style="font-size: 13px;">Bonds</span></div>
                <span style="font-size: 13px; font-weight: 600;">18%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 8px; height: 8px; background: #c4b5fd; border-radius: 50%;"></div><span style="font-size: 13px;">Crypto</span></div>
                <span style="font-size: 13px; font-weight: 600;">12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  conversational: `
    <div style="font-family: system-ui; background: #f8fafc; min-height: 100%; display: flex; flex-direction: column;">
      <div style="background: white; border-bottom: 1px solid #e5e7eb; padding: 16px 24px; display: flex; align-items: center; gap: 12px;">
        <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">🤖</div>
        <div>
          <div style="font-size: 15px; font-weight: 600;">FinanceHub Assistant</div>
          <div style="font-size: 12px; color: #22c55e;">Online</div>
        </div>
      </div>
      <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
        <div style="display: flex; gap: 10px; max-width: 80%;">
          <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">🤖</div>
          <div style="background: white; border-radius: 16px 16px 16px 4px; padding: 12px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.06); font-size: 14px; line-height: 1.5;">
            Hello John! 👋 I'm your financial assistant. How can I help you today? I can help with account balances, transactions, investments, or financial planning.
          </div>
        </div>
        <div style="display: flex; gap: 10px; max-width: 80%; align-self: flex-end; flex-direction: row-reverse;">
          <div style="width: 28px; height: 28px; background: #4f46e5; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: 600;">JM</div>
          <div style="background: #4f46e5; color: white; border-radius: 16px 16px 4px 16px; padding: 12px 16px; font-size: 14px; line-height: 1.5;">
            Show me my monthly spending breakdown
          </div>
        </div>
        <div style="display: flex; gap: 10px; max-width: 85%;">
          <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">🤖</div>
          <div style="background: white; border-radius: 16px 16px 16px 4px; padding: 12px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.06); font-size: 14px; line-height: 1.5;">
            <div>Here's your spending breakdown for this month:</div>
            <div style="margin: 12px 0; padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e5e7eb;"><span>🏠 Housing</span><strong>$1,200</strong></div>
              <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e5e7eb;"><span>🍔 Food & Dining</span><strong>$480</strong></div>
              <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e5e7eb;"><span>🚗 Transport</span><strong>$320</strong></div>
              <div style="display: flex; justify-content: space-between; padding: 6px 0;"><span>🎬 Entertainment</span><strong>$180</strong></div>
            </div>
            <div>Total: <strong>$2,180</strong> — You're under budget by $320! 🎉</div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; padding-left: 38px;">
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 20px; padding: 8px 16px; font-size: 13px; color: #4f46e5; cursor: pointer;">Show investments</div>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 20px; padding: 8px 16px; font-size: 13px; color: #4f46e5; cursor: pointer;">Savings tips</div>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 20px; padding: 8px 16px; font-size: 13px; color: #4f46e5; cursor: pointer;">Set budget</div>
        </div>
      </div>
      <div style="padding: 16px 20px; background: white; border-top: 1px solid #e5e7eb;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <input style="flex: 1; border: 1px solid #e5e7eb; border-radius: 24px; padding: 10px 16px; font-size: 14px; outline: none;" placeholder="Ask about your finances..." />
          <div style="width: 36px; height: 36px; background: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">→</div>
        </div>
      </div>
    </div>
  `,
  voice: `
    <div style="font-family: system-ui; background: linear-gradient(180deg, #1a1a2e 0%, #2d1b69 50%, #1a1a2e 100%); min-height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 48px;">
        <div style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 8px;">Connected to</div>
        <div style="font-size: 22px; font-weight: 700;">FinanceHub Voice</div>
      </div>
      <div style="position: relative; width: 180px; height: 180px; margin-bottom: 48px;">
        <div style="position: absolute; inset: 0; border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 50%; animation: pipeline-pulse 2s ease-in-out infinite;"></div>
        <div style="position: absolute; inset: 15px; border: 2px solid rgba(139, 92, 246, 0.5); border-radius: 50%; animation: pipeline-pulse 2s ease-in-out infinite 0.3s;"></div>
        <div style="position: absolute; inset: 30px; background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
        </div>
      </div>
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Listening...</div>
        <div style="font-size: 14px; color: rgba(255,255,255,0.6);">"What's my account balance?"</div>
      </div>
      <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 40px;">
        <div style="width: 3px; height: 16px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite;"></div>
        <div style="width: 3px; height: 28px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.1s;"></div>
        <div style="width: 3px; height: 40px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.2s;"></div>
        <div style="width: 3px; height: 32px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.3s;"></div>
        <div style="width: 3px; height: 20px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.4s;"></div>
        <div style="width: 3px; height: 36px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.5s;"></div>
        <div style="width: 3px; height: 24px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.6s;"></div>
        <div style="width: 3px; height: 44px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.7s;"></div>
        <div style="width: 3px; height: 18px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.8s;"></div>
        <div style="width: 3px; height: 30px; background: #8b5cf6; border-radius: 2px; animation: pipeline-pulse 1s ease-in-out infinite 0.9s;"></div>
      </div>
      <div style="display: flex; gap: 24px;">
        <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1 3 1 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"/></svg>
        </div>
        <div style="width: 56px; height: 56px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
      </div>
    </div>
  `,
};

export function useAppStore() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectCategory | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>(DEFAULT_PIPELINE);
  const [activeFormFactor, setActiveFormFactor] = useState<FormFactor>('mobile');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>(SAMPLE_HISTORY);
  const [generatedProduct, setGeneratedProduct] = useState<GeneratedProduct | null>(null);
  const [selectedModel, setSelectedModel] = useState('Opus 4.6');
  const [hasGenerated, setHasGenerated] = useState(false);

  const resetPipeline = useCallback(() => {
    setPipelineSteps(DEFAULT_PIPELINE.map(s => ({ ...s, status: 'pending' })));
  }, []);

  const runPipeline = useCallback(async (prompt: string) => {
    setIsGenerating(true);
    setHasGenerated(true);
    resetPipeline();

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate pipeline stages
    for (let i = 0; i < DEFAULT_PIPELINE.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setPipelineSteps(prev =>
        prev.map((step, idx) => ({
          ...step,
          status: idx < i ? 'completed' : idx === i ? 'active' : 'pending',
        }))
      );
    }

    // Mark all completed
    await new Promise(resolve => setTimeout(resolve, 600));
    setPipelineSteps(prev =>
      prev.map(step => ({ ...step, status: 'completed' }))
    );

    // Set generated product
    setGeneratedProduct({
      formFactor: activeFormFactor,
      html: PRODUCT_TEMPLATES[activeFormFactor],
      title: prompt.slice(0, 50),
    });

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I've designed a comprehensive fintech product solution based on your requirements. The ${activeFormFactor} view is now showing in the preview panel. You can switch between different form factors to see how the experience adapts across devices.`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsGenerating(false);
    setCurrentPrompt('');

    // Add to history
    setHistory(prev => [
      { id: Date.now().toString(), title: prompt.slice(0, 25) + '...', timestamp: new Date() },
      ...prev,
    ]);
  }, [activeFormFactor, resetPipeline]);

  const handleSubmit = useCallback(() => {
    if (!currentPrompt.trim() || isGenerating) return;
    runPipeline(currentPrompt);
  }, [currentPrompt, isGenerating, runPipeline]);

  const switchFormFactor = useCallback((ff: FormFactor) => {
    setActiveFormFactor(ff);
    if (hasGenerated) {
      setGeneratedProduct(prev =>
        prev ? { ...prev, formFactor: ff, html: PRODUCT_TEMPLATES[ff] } : null
      );
    }
  }, [hasGenerated]);

  return {
    sidebarOpen,
    setSidebarOpen,
    selectedProject,
    setSelectedProject,
    currentPrompt,
    setCurrentPrompt,
    isGenerating,
    pipelineSteps,
    activeFormFactor,
    switchFormFactor,
    messages,
    history,
    generatedProduct,
    selectedModel,
    setSelectedModel,
    handleSubmit,
    hasGenerated,
  };
}
