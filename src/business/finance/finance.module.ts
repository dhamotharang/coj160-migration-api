import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLBanks } from 'src/common/lookup/entities/mysql/bank.entity';
import { LookupModule } from 'src/common/lookup/lookup.module';
import { PersonModule } from 'src/common/person/person.module';
import { CaseModule } from '../case/case.module';
import { MySQLReceiptDetails } from './entities/mysql/receipt-detail.entity';
import { MySQLReceipts } from './entities/mysql/receipt.entity';
import { OracleFinReceiptDetails } from './entities/oracle/fin-receipt-detail.entity';
import { OracleFinReceipts } from './entities/oracle/fin-receipt.entity';
import { FinReceiptController } from './fin-receipt/fin-receipt.controller';
import { FinReceiptService } from './fin-receipt/fin-receipt.service';
import { ReceiptDetailController } from './receipt-detail/receipt-detail.controller';
import { ReceiptDetailService } from './receipt-detail/receipt-detail.service';
import { ReceiptChequeService } from './receipt-cheque/receipt-cheque.service';
import { ReceiptChequeController } from './receipt-cheque/receipt-cheque.controller';
import { ReceiptCrditController } from './receipt-crdit/receipt-crdit.controller';
import { ReceiptCrditService } from './receipt-crdit/receipt-crdit.service';
import { ReceiptCancelService } from './receipt-cancel/receipt-cancel.service';
import { ReceiptCancelController } from './receipt-cancel/receipt-cancel.controller';
import { OracleFinReceiptCheques } from './entities/oracle/fin-receipt-cheque.entity';
import { OracleFinReceiptCredits } from './entities/oracle/fin-receipt-credit.entity';
import { OracleFinReceiptCancels } from './entities/oracle/fin-receipt-cancel.entity';
import { ReceiptPaymentService } from './receipt-payment/receipt-payment.service';
import { ReceiptPaymentController } from './receipt-payment/receipt-payment.controller';
import { ReceiptPaymentDetailController } from './receipt-payment-detail/receipt-payment-detail.controller';
import { ReceiptPaymentDetailService } from './receipt-payment-detail/receipt-payment-detail.service';
import { ReceiptBalanceHistoryService } from './receipt-balance-history/receipt-balance-history.service';
import { ReceiptBalanceHistoryController } from './receipt-balance-history/receipt-balance-history.controller';
import { OracleFinPayments } from './entities/oracle/fin-payment.entity';
import { MySQLReturnReceipts } from './entities/mysql/return-receipt.entity';
import { OracleFinPaymentDetails } from './entities/oracle/fin-payment-detail.entity';
import { OracleFinReceiptBalanceHistories } from './entities/oracle/fin-receipt-balance-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleFinReceipts,
      OracleFinReceiptDetails,
      OracleFinReceiptCheques,
      OracleFinReceiptCredits,
      OracleFinReceiptCancels,
      OracleFinPayments,
      OracleFinPaymentDetails,
      OracleFinReceiptBalanceHistories
    ]),
    TypeOrmModule.forFeature([
      MySQLReceipts,
      MySQLBanks,
      MySQLReceiptDetails,
      MySQLReturnReceipts
    ], "mysql"),
    CaseModule,
    LookupModule,
    PersonModule,
  ],
  controllers: [FinReceiptController, ReceiptDetailController, ReceiptChequeController, ReceiptCrditController, ReceiptCancelController, ReceiptPaymentController, ReceiptPaymentDetailController, ReceiptBalanceHistoryController],
  providers: [FinReceiptService, ReceiptDetailService, ReceiptChequeService, ReceiptCrditService, ReceiptCancelService, ReceiptPaymentService, ReceiptPaymentDetailService, ReceiptBalanceHistoryService],
  exports: [FinReceiptService, ReceiptDetailService, ReceiptChequeService, ReceiptCrditService, ReceiptCancelService]
})
export class FinanceModule { }
