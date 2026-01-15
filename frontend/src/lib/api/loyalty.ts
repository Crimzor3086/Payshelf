import apiClient from './apiClient';

export interface LoyaltyMember {
  phone: string;
  name: string;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number;
  lastVisit: string;
  joinDate: string;
  visitsCount: number;
  nextTier: {
    name: string;
    pointsNeeded: number;
    progress: number;
  };
  rewards: {
    available: number;
    pending: number;
  };
}

export interface LoyaltyEarningRule {
  id: string;
  name: string;
  points: number;
  type: 'purchase' | 'visit' | 'birthday' | 'referral';
  minPurchase?: number;
  active: boolean;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  active: boolean;
  validUntil?: string;
}

export const loyaltyApi = {
  async getMember(phone: string): Promise<LoyaltyMember> {
    const { data } = await apiClient.get<LoyaltyMember>(`/loyalty/${phone}`);
    return data;
  },

  async getEarningRules(): Promise<LoyaltyEarningRule[]> {
    const { data } = await apiClient.get<LoyaltyEarningRule[]>('/loyalty/rules/earning');
    return data;
  },

  async getAvailableRewards(phone: string): Promise<LoyaltyReward[]> {
    const { data } = await apiClient.get<LoyaltyReward[]>(`/loyalty/${phone}/rewards`);
    return data;
  },

  async redeemReward(phone: string, rewardId: string): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post(`/loyalty/${phone}/redeem`, { rewardId });
    return data;
  },

  async getMemberHistory(phone: string, limit: number = 10) {
    const { data } = await apiClient.get(`/loyalty/${phone}/history?limit=${limit}`);
    return data;
  },
};
