USE [toroalert]
GO
/****** Object:  Table [dbo].[algorithms]    Script Date: 3/10/2023 8:54:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[algorithms](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[stocks] [nvarchar](max) NULL,
	[stoploss] [nvarchar](max) NULL,
	[min_capital] [int] NULL,
	[max_capital] [int] NULL,
	[algorithm_id] [nvarchar](50) NULL,
	[backtest_id] [nvarchar](50) NULL,
	[createdAt] [nvarchar](50) NULL,
	[updatedAt] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[backtests]    Script Date: 3/10/2023 8:54:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[backtests](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[report] [nvarchar](max) NULL,
	[status] [nvarchar](max) NULL,
	[algorithm_id] [nvarchar](50) NULL,
	[backtest_id] [nvarchar](50) NULL,
	[createdAt] [nvarchar](50) NULL,
	[updatedAt] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
