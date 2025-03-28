"use client";
import React from "react";
import CardWeatherBasic from "@/registry/block/card-weather/card-weather-basic/card-weather";
import CardWeatherForecast from "@/registry/block/card-weather/card-weather-forecast/card-weather";
import CardWeatherDetailed from "@/registry/block/card-weather/card-weather-detailed/card-weather";
import CardWeatherHourly from "@/registry/block/card-weather/card-weather-hourly/card-weather";
import CardWeatherAlert from "@/registry/block/card-weather/card-weather-alert/card-weather";
import CardWeatherComparison from "@/registry/block/card-weather/card-weather-comparison/card-weather";
import CardWeatherStats from "@/registry/block/card-weather/card-weather-stats/card-weather";
import CardWeatherMinimal from "@/registry/block/card-weather/card-weather-minimal/card-weather";

import CardVehicleStatus from "@/registry/block/card/card-vehicle-status/card";
import CardVehicleLocation from "@/registry/block/card/card-vehicle-location/card";
import CardVehicleMaintenance from "@/registry/block/card/card-vehicle-maintenance/card";
import CardVehicleTelemetry from "@/registry/block/card/card-vehicle-telemetry/card";
import CardVehicleAlerts from "@/registry/block/card/card-vehicle-alerts/card";
import CardVehicleDriver from "@/registry/block/card/card-vehicle-driver/card";
import CardVehicleTrip from "@/registry/block/card/card-vehicle-trip/card";
import CardVehicleCargo from "@/registry/block/card/card-vehicle-cargo/card";
import CardVehicleSummary from "@/registry/block/card/card-vehicle-summary/card";
import CardVehicleMinimal from "@/registry/block/card/card-vehicle-minimal/card";
import CardVehicleGeofence from "@/registry/block/card/card-vehicle-geofence/card";
import CardVehicleUtilization from "@/registry/block/card/card-vehicle-utilization/card";

import CardPdfStatsOverview1 from "@/registry/block/card/card-pdf_stats-overview-1/card";
import CardPdfManagementRecentList1 from "@/registry/block/card/card-pdf_management-recent_list-1/card";
import CardQuickActionsUploadPdf1 from "@/registry/block/card/card-quick_actions-upload_pdf-1/card";
import CardUsageMetricsTokenMonthly1 from "@/registry/block/card/card-usage_metrics-token_monthly-1/card";
import CardAgentConfigModelSelect1 from "@/registry/block/card/card-agent_config-model_select-1/card";
import CardChatActivityStartNew1 from "@/registry/block/card/card-chat_activity-start_new-1/card";
import CardRagSourceManageList1 from "@/registry/block/card/card-rag_source-manage_list-1/card";
import CardChatActivityRecentSessions1 from "@/registry/block/card/card-chat_activity-recent_sessions-1/card";
import CardUserProfileTierStatus1 from "@/registry/block/card/card-user_profile-tier_status-1/card";
import CardNotificationsList1 from "@/registry/block/card/card-notifications-list-1/card";
import CardPdfStatsDetailed1 from "@/registry/block/card/card-pdf_stats-detailed-1/card";

// Import new plant cards
import CardPlantOverview from "@/registry/block/card/card-plant-overview/card";
// import CardPlantOverview2 from "@/registry/block/card/card-plant-overview-2/card"; // Added
// import CardPlantOverview3 from "@/registry/block/card/card-plant-overview-3/card"; // Added
import CardPlantHealth from "@/registry/block/card/card-plant-health/card";
// import CardPlantHealth2 from "@/registry/block/card/card-plant-health-2/card"; // Placeholder if created
// import CardPlantHealth3 from "@/registry/block/card/card-plant-health-3/card"; // Placeholder if created
import CardPlantWatering from "@/registry/block/card/card-plant-watering/card";
// import CardPlantWatering2 from "@/registry/block/card/card-plant-watering-2/card"; // Placeholder if created
// import CardPlantWatering3 from "@/registry/block/card/card-plant-watering-3/card"; // Placeholder if created
import CardPlantEnvironment from "@/registry/block/card/card-plant-environment/card";
// import CardPlantEnvironment2 from "@/registry/block/card/card-plant-environment-2/card"; // Placeholder if created
// import CardPlantEnvironment3 from "@/registry/block/card/card-plant-environment-3/card"; // Placeholder if created
import CardPlantGrowth from "@/registry/block/card/card-plant-growth/card";
// import CardPlantGrowth2 from "@/registry/block/card/card-plant-growth-2/card"; // Placeholder if created
// import CardPlantGrowth3 from "@/registry/block/card/card-plant-growth-3/card"; // Placeholder if created
import CardPlantPests from "@/registry/block/card/card-plant-pests/card"; // Added
import CardPlantNutrients from "@/registry/block/card/card-plant-nutrients/card"; // Added
import CardPlantLight from "@/registry/block/card/card-plant-light/card"; // Added

// Import new file hosting cards
import { CardFileHosting1 } from "@/registry/block/card/card-file-hosting-1/card";
import { CardFileHosting2 } from "@/registry/block/card/card-file-hosting-2/card";
import { CardFileHosting3 } from "@/registry/block/card/card-file-hosting-3/card";
import { CardFileHosting4 } from "@/registry/block/card/card-file-hosting-4/card";
import { CardFileHosting5 } from "@/registry/block/card/card-file-hosting-5/card";
import { CardFileHosting6 } from "@/registry/block/card/card-file-hosting-6/card";
import { CardFileHosting7 } from "@/registry/block/card/card-file-hosting-7/card";
import { CardFileHosting8 } from "@/registry/block/card/card-file-hosting-8/card";
import { CardFileHosting9 } from "@/registry/block/card/card-file-hosting-9/card";
import { CardFileHosting10 } from "@/registry/block/card/card-file-hosting-10/card";
import { CardFileHosting11 } from "@/registry/block/card/card-file-hosting-11/card";
import { CardFileHosting12 } from "@/registry/block/card/card-file-hosting-12/card";
import { CardFileHosting13 } from "@/registry/block/card/card-file-hosting-13/card";
import { CardFileHosting14 } from "@/registry/block/card/card-file-hosting-14/card";
import { CardFileHosting15 } from "@/registry/block/card/card-file-hosting-15/card";
import { CardFileHosting16 } from "@/registry/block/card/card-file-hosting-16/card";
import { CardFileHosting17 } from "@/registry/block/card/card-file-hosting-17/card";
import { CardFileHosting18 } from "@/registry/block/card/card-file-hosting-18/card";
import { CardFileHosting19 } from "@/registry/block/card/card-file-hosting-19/card";
import { CardFileHosting20 } from "@/registry/block/card/card-file-hosting-20/card";

// Import new affiliate cards
import CardAffiliatePerformanceSummary1 from "@/registry/block/card/card-affiliate-performance-summary-1/card";
import CardAffiliateReferralLink1 from "@/registry/block/card/card-affiliate-referral-link-1/card";
import CardAffiliatePayoutBalance1 from "@/registry/block/card/card-affiliate-payout-balance-1/card";
import CardAffiliateCampaignTracking1 from "@/registry/block/card/card-affiliate-campaign-tracking-1/card";
import CardAffiliateTopProducts1 from "@/registry/block/card/card-affiliate-top-products-1/card";
import CardAffiliateTrafficSources1 from "@/registry/block/card/card-affiliate-traffic-sources-1/card";
import CardAffiliateLeaderboard1 from "@/registry/block/card/card-affiliate-leaderboard-1/card";
import CardAffiliateMarketingResources1 from "@/registry/block/card/card-affiliate-marketing-resources-1/card";
import CardAffiliatePerformanceSummary2 from "@/registry/block/card/card-affiliate-performance-summary-2/card";
import CardAffiliateLinkGenerator1 from "@/registry/block/card/card-affiliate-link-generator-1/card";
import CardAffiliateRecentActivity1 from "@/registry/block/card/card-affiliate-recent-activity-1/card";

// Import new link shortener cards
import CardStatsTotalLinks1 from "@/registry/block/card/card-stats-total-links-1/card";
import CardStatsClicksToday1 from "@/registry/block/card/card-stats-clicks-today-1/card";
import CardStatsEarningsMonth1 from "@/registry/block/card/card-stats-earnings-month-1/card";
import CardStatsCtr1 from "@/registry/block/card/card-stats-ctr-1/card";
import CardActivityRecentLinks1 from "@/registry/block/card/card-activity-recent-links-1/card";
import CardAnalyticsGeoDistribution1 from "@/registry/block/card/card-analytics-geo-distribution-1/card";
import CardAnalyticsReferrers1 from "@/registry/block/card/card-analytics-referrers-1/card";
import CardEarningsBalance1 from "@/registry/block/card/card-earnings-balance-1/card";
import CardEarningsPayoutHistory1 from "@/registry/block/card/card-earnings-payout-history-1/card";
import CardLinksRecentList1 from "@/registry/block/card/card-links-recent-list-1/card";
import CardReferralOverview1 from "@/registry/block/card/card-referral-overview-1/card";
import CardAnalyticsClicksChart1 from "@/registry/block/card/card-analytics-clicks-chart-1/card";
import CardEarningsGoalTracker1 from "@/registry/block/card/card-earnings-goal-tracker-1/card";
import CardPerformanceLinkComparison1 from "@/registry/block/card/card-performance-link-comparison-1/card";
import CardAccountTierLimits1 from "@/registry/block/card/card-account-tier-limits-1/card";
import CardAccountApiKeys1 from "@/registry/block/card/card-account-api-keys-1/card";
import CardNotificationsAlerts1 from "@/registry/block/card/card-notifications-alerts-1/card";
import CardActionQuickReports1 from "@/registry/block/card/card-action-quick-reports-1/card";
// Note: CardPerformanceTopLink1 and CardActionQuickShorten1 were skipped due to errors.

import { CardFormProfile1 } from "@/registry/block/card/card-form-profile-1/card-form";
import { CardFormPassword1 } from "@/registry/block/card/card-form-password-1/card-form";
import { CardFormNotifications1 } from "@/registry/block/card/card-form-notifications-1/card-form";
import { CardFormShipping1 } from "@/registry/block/card/card-form-shipping-1/card-form";
import { CardFormPayment1 } from "@/registry/block/card/card-form-payment-1/card-form";
import { CardFormContact1 } from "@/registry/block/card/card-form-contact-1/card-form";
import { CardFormNewsletter1 } from "@/registry/block/card/card-form-newsletter-1/card-form";
import { CardFormLogin1 } from "@/registry/block/card/card-form-login-1/card-form";
import { CardFormSignUp1 } from "@/registry/block/card/card-form-signup-1/card-form";
import { CardFormSearch1 } from "@/registry/block/card/card-form-search-1/card-form";
import { CardFormTask1 } from "@/registry/block/card/card-form-task-1/card-form";
import { CardFormEvent1 } from "@/registry/block/card/card-form-event-1/card-form";
import { CardFormReview1 } from "@/registry/block/card/card-form-review-1/card-form";
import { CardFormForgotPassword1 } from "@/registry/block/card/card-form-forgot-password-1/card-form";
import { CardFormDiscount1 } from "@/registry/block/card/card-form-discount-1/card-form";
import { CardSmartHomePlug1 } from "@/registry/block/card/card-smarthome-plug-1/card";
import { CardSmartHomeMedia1 } from "@/registry/block/card/card-smarthome-media-1/card";
import { CardSmartHomeBlinds1 } from "@/registry/block/card/card-smarthome-blinds-1/card";
import Navbar2 from "@/registry/block/navbar/navbar-2/navbar";

const CardPage = () => {
  return (
    <>
      <Navbar2 />
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        <h1 className="text-3xl font-bold mb-8 col-span-full">
          Card Collection
        </h1>

        <section>
          <CardWeatherBasic />
        </section>

        <section>
          <CardWeatherForecast />
        </section>

        <section>
          <CardWeatherDetailed />
        </section>

        <section>
          <CardWeatherHourly />
        </section>

        <section>
          <CardWeatherAlert />
          <CardWeatherAlert alerts={[]} /> {/* Example with no alerts */}
        </section>

        <section>
          <CardWeatherComparison />
        </section>

        <section>
          <CardWeatherStats />
        </section>

        <section>
          <CardWeatherMinimal />
          <CardWeatherMinimal
            location="Tokyo"
            currentTemp={18}
            condition="Rainy"
          />
        </section>

        <section>
          <CardVehicleStatus />
        </section>

        <section>
          <CardVehicleLocation />
        </section>

        <section>
          <CardVehicleMaintenance />
        </section>

        <section>
          <CardVehicleTelemetry />
        </section>

        <section>
          <CardVehicleAlerts />
        </section>

        <section>
          <CardVehicleDriver />
        </section>

        <section>
          <CardVehicleTrip />
        </section>

        <section>
          <CardVehicleCargo />
        </section>

        <section>
          <CardVehicleSummary />
        </section>

        <section>
          <CardVehicleMinimal />
        </section>

        <section>
          <CardVehicleGeofence />
        </section>

        <section>
          <CardVehicleUtilization />
        </section>

        {/* New Plant Card Sections */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Plant Overview</h2>
          <CardPlantOverview />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Plant Health (Progress Bars)
          </h2>
          <CardPlantHealth />
        </section>
        {/* Add sections for Health 2 & 3 when created */}

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Plant Watering (Schedule & Button)
          </h2>
          <CardPlantWatering />
        </section>
        {/* Add sections for Watering 2 & 3 when created */}

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Plant Environment (Metrics)
          </h2>
          <CardPlantEnvironment />
        </section>
        {/* Add sections for Environment 2 & 3 when created */}

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Plant Growth (Chart Placeholder)
          </h2>
          <CardPlantGrowth />
        </section>
        {/* Add sections for Growth 2 & 3 when created */}

        <section>
          <h2 className="text-xl font-semibold mb-3">Plant Pests</h2>
          <CardPlantPests />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Plant Nutrients</h2>
          <CardPlantNutrients />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Plant Light</h2>
          <CardPlantLight />
        </section>

        {/* New File Hosting Card Sections */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 1: Preview
          </h2>
          <CardFileHosting1 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 2: Storage
          </h2>
          <CardFileHosting2 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 3: Activity
          </h2>
          <CardFileHosting3 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 4: Sharing
          </h2>
          <CardFileHosting4 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 5: Version History
          </h2>
          <CardFileHosting5 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 6: Upload Progress
          </h2>
          <CardFileHosting6 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 7: Details
          </h2>
          <CardFileHosting7 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 8: Comments
          </h2>
          <CardFileHosting8 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">File Hosting 9: Folder</h2>
          <CardFileHosting9 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">File Hosting 10: Plan</h2>
          <CardFileHosting10 />
        </section>

        {/* More File Hosting Card Sections */}
        <section>
          <h2 className="text-xl font-semibold mb-3">File Hosting 11: Trash</h2>
          <CardFileHosting11 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 12: Shared Links
          </h2>
          <CardFileHosting12 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 13: File Request
          </h2>
          <CardFileHosting13 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 14: Offline Access
          </h2>
          <CardFileHosting14 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 15: Security Log
          </h2>
          <CardFileHosting15 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 16: Team Overview
          </h2>
          <CardFileHosting16 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 17: File Lock
          </h2>
          <CardFileHosting17 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 18: Quick Access
          </h2>
          <CardFileHosting18 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 19: Storage Breakdown
          </h2>
          <CardFileHosting19 />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">
            File Hosting 20: Transfer Status
          </h2>
          <CardFileHosting20 />
        </section>

        {/* New Affiliate Card Sections */}
        <section className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
            Affiliate Dashboard Cards
          </h2>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Performance 1
          </h2>
          <CardAffiliatePerformanceSummary1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Referral Link
          </h2>
          <CardAffiliateReferralLink1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Payout Balance
          </h2>
          <CardAffiliatePayoutBalance1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Campaign Tracking
          </h2>
          <CardAffiliateCampaignTracking1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Affiliate Top Products</h2>
          <CardAffiliateTopProducts1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Traffic Sources
          </h2>
          <CardAffiliateTrafficSources1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Affiliate Leaderboard</h2>
          <CardAffiliateLeaderboard1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Marketing Resources
          </h2>
          <CardAffiliateMarketingResources1 />
        </section>

        <section className="md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Performance 2 (Tabs)
          </h2>
          <CardAffiliatePerformanceSummary2 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Link Generator
          </h2>
          <CardAffiliateLinkGenerator1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Affiliate Recent Activity
          </h2>
          <CardAffiliateRecentActivity1 />
        </section>

        {/* New Link Shortener Card Sections */}
        <section className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
            Link Shortener Dashboard Cards
          </h2>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Stats: Total Links</h2>
          <CardStatsTotalLinks1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Stats: Clicks Today</h2>
          <CardStatsClicksToday1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Stats: Monthly Earnings
          </h2>
          <CardStatsEarningsMonth1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Stats: CTR</h2>
          <CardStatsCtr1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Activity: Recent Links/Clicks
          </h2>
          <CardActivityRecentLinks1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Analytics: Geo Distribution
          </h2>
          <CardAnalyticsGeoDistribution1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Analytics: Top Referrers
          </h2>
          <CardAnalyticsReferrers1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Earnings: Current Balance
          </h2>
          <CardEarningsBalance1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Earnings: Payout History
          </h2>
          <CardEarningsPayoutHistory1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Links: Recent List & Actions
          </h2>
          <CardLinksRecentList1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Referral: Overview</h2>
          <CardReferralOverview1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Analytics: Clicks Chart (Placeholder)
          </h2>
          <CardAnalyticsClicksChart1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Earnings: Goal Tracker</h2>
          <CardEarningsGoalTracker1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Performance: Link Comparison
          </h2>
          <CardPerformanceLinkComparison1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Account: Tier & Limits</h2>
          <CardAccountTierLimits1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Account: API Keys</h2>
          <CardAccountApiKeys1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Notifications & Alerts</h2>
          <CardNotificationsAlerts1 />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Actions: Quick Reports</h2>
          <CardActionQuickReports1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">PDF Stats Overview</h2>
          <CardPdfStatsOverview1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">PDF Stats Detailed</h2>
          <CardPdfStatsDetailed1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Upload</h2>
          <CardQuickActionsUploadPdf1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Documents</h2>
          <CardPdfManagementRecentList1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Start New Chat</h2>
          <CardChatActivityStartNew1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Chat Sessions</h2>
          <CardChatActivityRecentSessions1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Monthly Token Usage</h2>
          <CardUsageMetricsTokenMonthly1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Subscription Tier</h2>
          <CardUserProfileTierStatus1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Agent Model</h2>
          <CardAgentConfigModelSelect1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">RAG Data Sources</h2>
          <CardRagSourceManageList1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Notifications</h2>
          <CardNotificationsList1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">1. Profile Edit</h2>
          <CardFormProfile1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. Change Password</h2>
          <CardFormPassword1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">
            3. Notification Settings
          </h2>
          <CardFormNotifications1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. Shipping Address</h2>
          <CardFormShipping1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. Payment Details</h2>
          <CardFormPayment1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. Contact Us</h2>
          <CardFormContact1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">7. Newsletter Signup</h2>
          <CardFormNewsletter1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">8. Login</h2>
          <CardFormLogin1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">9. Sign Up</h2>
          <CardFormSignUp1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">10. Advanced Search</h2>
          <CardFormSearch1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">11. Create Task</h2>
          <CardFormTask1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">12. Create Event</h2>
          <CardFormEvent1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">13. Product Review</h2>
          <CardFormReview1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">14. Forgot Password</h2>
          <CardFormForgotPassword1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">15. Apply Discount</h2>
          <CardFormDiscount1 />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-3">Smart Plug</h2>
          <CardSmartHomePlug1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Media Control</h2>
          <CardSmartHomeMedia1 />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Smart Blinds</h2>
          <CardSmartHomeBlinds1 />
        </section>
      </div>
    </>
  );
};

export default CardPage;
