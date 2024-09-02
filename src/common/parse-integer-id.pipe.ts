import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntegerIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const reg = /^\d+$/;

        if (!reg.test(value)) {
            throw new BadRequestException('Is not an integer');
        }

        return parseInt(value, 10);
    }
}
