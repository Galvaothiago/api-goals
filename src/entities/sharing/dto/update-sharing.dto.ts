import { PartialType } from '@nestjs/mapped-types';
import { Sharing } from '../sharing.entity';

export class UpdateSharingDto extends PartialType(Sharing) {}
