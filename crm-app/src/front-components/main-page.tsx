import { defineFrontComponent } from 'twenty-sdk/define';
import { useEffect, useState } from 'react';
import {
  AppPath,
  enqueueSnackbar,
  navigate,
  useColorScheme,
} from 'twenty-sdk/front-component';
import { CoreApiClient } from 'twenty-client-sdk/core';

import { APP_DISPLAY_NAME, MAIN_PAGE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

type FocusStat = {
  key: string;
  label: string;
  count: number;
  hint: string;
  iconBg: string;
  iconColor: string;
  targetObject: string;
};

const emptyStats: FocusStat[] = [];

const TodayDashboard = () => {
  const [stats, setStats] = useState<FocusStat[]>(emptyStats);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const dark = colorScheme === 'dark';

  useEffect(() => {
    let cancelled = false;
    const client = new CoreApiClient();

    const load = async () => {
      try {
        // Run all focus queries in a single batched request for efficiency.
        const [waitingOnMe, moneyOwed, blocked, active, followUp, openFindings] =
          await Promise.all([
            client.query({
              clientProjects: {
                __args: { filter: { status: { in: ['WAITING_ON_ME'] } } },
                totalCount: true,
              },
            }),
            client.query({
              clientProjects: {
                __args: {
                  filter: {
                    paymentStatus: {
                      in: ['DEPOSIT_DUE', 'PARTIALLY_PAID', 'OVERDUE'],
                    },
                  },
                },
                totalCount: true,
              },
            }),
            client.query({
              clientProjects: {
                __args: { filter: { status: { in: ['BLOCKED'] } } },
                totalCount: true,
              },
            }),
            client.query({
              clientProjects: {
                __args: {
                  filter: {
                    status: {
                      in: ['ACTIVE', 'WAITING_ON_ME', 'WAITING_ON_CLIENT', 'BLOCKED', 'REVIEW'],
                    },
                  },
                },
                totalCount: true,
              },
            }),
            client.query({
              companies: {
                __args: { filter: { nextAction: { is: 'NOT_NULL' } } },
                totalCount: true,
              },
            }),
            client.query({
              operationalFindings: {
                __args: {
                  filter: {
                    status: { in: ['OBSERVED', 'INVESTIGATING', 'DISCUSSED'] },
                  },
                },
                totalCount: true,
              },
            }),
          ]);

        if (cancelled) return;

        setStats([
          {
            key: 'waiting-on-me',
            label: 'Waiting on Me',
            count: waitingOnMe.clientProjects?.totalCount ?? 0,
            hint: 'Projects needing your action',
            iconBg: '#3B82F61A',
            iconColor: '#3B82F6',
            targetObject: 'clientProjects',
          },
          {
            key: 'money-owed',
            label: 'Money Owed',
            count: moneyOwed.clientProjects?.totalCount ?? 0,
            hint: 'Outstanding balances on client projects',
            iconBg: '#F59E0B1A',
            iconColor: '#F59E0B',
            targetObject: 'clientProjects',
          },
          {
            key: 'blocked',
            label: 'Blocked',
            count: blocked.clientProjects?.totalCount ?? 0,
            hint: 'Stuck — needs unblocking',
            iconBg: '#EF44441A',
            iconColor: '#EF4444',
            targetObject: 'clientProjects',
          },
          {
            key: 'active',
            label: 'Active Projects',
            count: active.clientProjects?.totalCount ?? 0,
            hint: 'Currently in progress',
            iconBg: '#22C55E1A',
            iconColor: '#22C55E',
            targetObject: 'clientProjects',
          },
          {
            key: 'follow-up',
            label: 'Need Follow Up',
            count: followUp.companies?.totalCount ?? 0,
            hint: 'Companies with a next action set',
            iconBg: '#8B5CF61A',
            iconColor: '#8B5CF6',
            targetObject: 'companies',
          },
          {
            key: 'findings',
            label: 'Open Findings',
            count: openFindings.operationalFindings?.totalCount ?? 0,
            hint: 'Issues observed or under investigation',
            iconBg: '#06B6D41A',
            iconColor: '#06B6D4',
            targetObject: 'operationalFindings',
          },
        ]);
      } catch (err) {
        if (!cancelled) {
          enqueueSnackbar({
            message: 'Could not load the Today dashboard',
            variant: 'error',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const openObject = (plural: string) => {
    navigate(AppPath.RecordIndexPage, { objectNamePlural: plural });
  };

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const cardBg = dark ? '#1B1B1F' : '#FFFFFF';
  const cardBorder = dark ? '#2A2A30' : '#E9E9EE';
  const textPrimary = dark ? '#EDEDF0' : '#1D1D21';
  const textSecondary = dark ? '#8A8A93' : '#6B6B75';
  const metaText = dark ? '#6E6E78' : '#9A9AA3';

  return (
    <div
      style={{
        boxSizing: 'border-box',
        height: '100%',
        minHeight: '100%',
        width: '100%',
        padding: '28px 32px',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflow: 'auto',
        color: textPrimary,
      }}
    >
      <div>
        <div
          style={{
            fontSize: '26px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {today}
        </div>
        <div style={{ fontSize: '13px', color: textSecondary, marginTop: '4px' }}>
          Live snapshot of your client operations at a glance.
        </div>
      </div>

      {loading ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            color: textSecondary,
          }}
        >
          Loading your day…
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {stats.map((stat) => (
            <button
              key={stat.key}
              onClick={() => openObject(stat.targetObject)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '6px',
                padding: '20px',
                borderRadius: '14px',
                border: `1px solid ${cardBorder}`,
                background: cardBg,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                boxShadow: dark ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
                transition: 'transform 0.12s ease, box-shadow 0.12s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = dark
                  ? '0 4px 16px rgba(0,0,0,0.4)'
                  : '0 6px 18px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = dark
                  ? 'none'
                  : '0 1px 2px rgba(0,0,0,0.04)';
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9px',
                  background: stat.iconBg,
                  color: stat.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '17px' }}>●</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '30px', fontWeight: 700, lineHeight: 1 }}>
                  {stat.count}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>
                  {stat.label}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: textSecondary }}>
                {stat.hint}
              </div>
            </button>
          ))}
        </div>
      )}

      <div style={{ fontSize: '11px', color: metaText, marginTop: 'auto' }}>
        {APP_DISPLAY_NAME} — today&apos;s focus. Click a card to open its records.
      </div>
    </div>
  );
};

export default defineFrontComponent({
  universalIdentifier: MAIN_PAGE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: 'Today',
  description: `${APP_DISPLAY_NAME} Today dashboard — live snapshot of focus areas`,
  component: TodayDashboard,
});
