import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Brand } from '../brands/entities/brand.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 140, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'integer' })
    price: number;

    @Column({ type: 'integer' })
    stock: number;

    @Column({ type: 'varchar', length: 255 })
    image: string;

    @Column({ type: 'integer', nullable: true })
    brand_id: number;

    @ManyToOne(() => Brand, (brand) => brand.products, { nullable: true })
    @JoinColumn({ name: 'brand_id' }) // Which table has the property
    brand: Brand;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deleted_at: Date;
}
