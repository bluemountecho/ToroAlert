using System;
using System.Collections.Generic;
using System.Text;

namespace ToroAdmin.Utilities
{
    internal class MarketPlaceConstants
    {
        //public static string BASE_URL= "https://toro-marketplace-ap.herokuapp.com";
        public static string BASE_URL = "https://polar-thicket-00230.herokuapp.com";
        public static string ROHITBEARERTOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGU3ZGIxYTM0ZTc5MDAxNmQxNjllZSIsIm5hbWUiOiJKb2huIiwiZW1haWwiOiJwcl9yb2hpdEBob3RtYWlsLmNvbSIsInBob25lIjoiKzE1MDM4ODAwOTI4IiwiaXNBZHZpc29yIjpmYWxzZSwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNQaG9uZVZlcmlmaWVkIjp0cnVlLCJlbmFibGVPbmVBbGVydCI6ZmFsc2UsImZ1bmRBbW91bnQiOjEwMDAwMCwiaXNTdG9ja3NPcHRpb25zQWxlcnQiOmZhbHNlLCJpc09wdGlvbnNBbGVydCI6ZmFsc2UsImlhdCI6MTY0OTU2NDIzNywiZXhwIjoxNjg1NTY0MjM3fQ.hIwEbTZwM43cMk615FkyYQ2lKofRkGCZhwqRPkFaiD8";

        public static string PULL_BACKTEST_DATA = "/admin/pull/backtestData";
        public static string PUSH_BACKTEST_DATA = "/admin/push/backtestData";
        public static string PULL_LEASE_DATA = "/admin/pull/leaseData";
        public static string PUSH_LEASE_DATA= "/admin/push/leaseData";
        public static string PUSH_ALERTS = "/admin/push/alerts";
        public static string PUSH_STOCK= "/admin/push/stocks";
        public static string PUSH_MF = "/admin/push/mutualFunds";
        public static string GET_STOCK = "/api/stock/match/";
        public static string GET_MF = "/api/mutualFunds/match/";
    }

}
